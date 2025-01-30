/**
 * @jest-environment node
 */
import { createStorageClient } from "@/supabase/create-storage-client"
import { POST } from "./route"
import { invokeApiHandler } from "../../../../../../test-utils/invoke-api-handler"
import {
  createInsertOrUpdate,
  mockSupabaseClient,
} from "../../../../../../test-utils/mock-supabase-client"
import { createMockSilo } from "../../../../../../test-utils/factories/silo-factory"

jest.mock("../../../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

jest.mock("@/supabase/create-storage-client")

const mockStorage = {
  from: jest.fn().mockReturnThis(),
  upload: jest.fn(),
  getPublicUrl: jest.fn(),
}

describe("Upload silo asset route", () => {
  beforeEach(() => {
    ;(createStorageClient as jest.Mock).mockReturnValue(mockStorage)
  })

  it("returns 400 if no file is provided", async () => {
    const res = await invokeApiHandler("POST", "/api/upload", POST, {
      body: new FormData(),
      params: { id: "1" },
    })

    expect(res.status).toBe(400)
    expect(res.body).toEqual({ message: "No file provided" })
  })

  it("uploads a file and updates the silo", async () => {
    const formData = new FormData()
    const fileName = "test.png"
    const contentType = "image/png"
    const publicUrl = `https://images.com/${fileName}`
    const file = new File(["test content"], fileName, { type: contentType })

    formData.append("file", file)
    formData.append("type", "network_logo")

    mockStorage.upload.mockResolvedValue({ error: null })
    mockStorage.getPublicUrl.mockReturnValue({
      data: { publicUrl },
    })

    mockSupabaseClient
      .from("silos")
      .update.mockImplementation(() => createInsertOrUpdate(createMockSilo()))

    const res = await invokeApiHandler("POST", "/api/upload", POST, {
      body: formData,
      params: { id: "1" },
    })

    expect(res.status).toBe(200)
    expect(res.body).toEqual({ url: publicUrl })
    expect(mockStorage.upload).toHaveBeenCalledWith(
      `/1/network_logo/test.png`,
      file,
      {
        contentType,
        upsert: true,
      },
    )

    expect(mockSupabaseClient.from("silos").update).toHaveBeenCalledWith({
      network_logo: publicUrl,
    })
  })

  it("returns a 500 if the upload fails", async () => {
    const formData = new FormData()
    const file = new File(["test content"], "test.txt", { type: "text/plain" })

    formData.append("file", file)
    formData.append("type", "network_logo")

    mockStorage.upload.mockResolvedValue({ error: new Error("Upload failed") })

    const res = await invokeApiHandler("POST", "/api/upload", POST, {
      body: formData,
      params: { id: "1" },
    })

    expect(res.status).toBe(500)
    expect(res.body).toEqual({ message: "Upload failed" })
  })
})
