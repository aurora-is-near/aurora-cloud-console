/**
 * @jest-environment node
 */
import { GET, POST } from "./route"
import {
  createInsertOrUpdate,
  createSelect,
  mockSupabaseClient,
} from "../../../../../../test-utils/mock-supabase-client"
import { setupJestOpenApi } from "../../../../../../test-utils/setup-jest-openapi"
import { invokeApiHandler } from "../../../../../../test-utils/invoke-api-handler"
import { createMockSilo } from "../../../../../../test-utils/factories/silo-factory"
import { createMockBridge } from "../../../../../../test-utils/factories/bridge-factory"

jest.mock("../../../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

describe("Bridges route", () => {
  beforeAll(setupJestOpenApi)

  beforeEach(() => {
    mockSupabaseClient
      .from("silos")
      .select.mockImplementation(() => createSelect())

    mockSupabaseClient
      .from("bridges")
      .select.mockImplementation(() => createSelect())
  })

  describe("GET", () => {
    it("returns a disabled bridge", async () => {
      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))

      const res = await invokeApiHandler("GET", "/api/silos/1/bridge", GET)

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        enabled: false,
        createdAt: null,
        updatedAt: null,
        fromNetworks: null,
        toNetworks: null,
      })
    })

    it("returns an enabled bridge", async () => {
      const mockBridge = createMockBridge({
        from_networks: ["AURORA"],
        to_networks: ["ETHEREUM"],
      })

      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))

      mockSupabaseClient
        .from("bridges")
        .select.mockImplementation(() => createSelect(mockBridge))

      const res = await invokeApiHandler("GET", "/api/silos/1/bridge", GET)

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        enabled: true,
        createdAt: mockBridge.created_at,
        updatedAt: mockBridge.updated_at,
        fromNetworks: ["AURORA"],
        toNetworks: ["ETHEREUM"],
      })
    })
  })

  describe("POST", () => {
    it("returns a 404 for a non-existant silo", async () => {
      await expect(async () =>
        invokeApiHandler("POST", "/api/silos/1/bridge", POST),
      ).rejects.toThrow("Not Found")
    })

    it("returns a 400 if the bridge already exists", async () => {
      mockSupabaseClient
        .from("bridges")
        .select.mockImplementation(() => createSelect(createMockBridge()))

      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))

      let error

      try {
        await invokeApiHandler("POST", "/api/silos/1/bridge", POST)
      } catch (e) {
        error = e
      }

      expect(error).not.toBeUndefined()
    })

    it("creates a bridge", async () => {
      const mockBridge = createMockBridge()

      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))

      mockSupabaseClient
        .from("bridges")
        .insert.mockImplementation(() => createInsertOrUpdate(mockBridge))

      const res = await invokeApiHandler("POST", "/api/silos/1/bridge", POST, {
        body: {},
      })

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        enabled: true,
        createdAt: mockBridge.created_at,
        updatedAt: mockBridge.updated_at,
        fromNetworks: [],
        toNetworks: [],
      })

      expect(mockSupabaseClient.from("bridges").insert).toHaveBeenCalledWith({
        silo_id: 1,
      })
    })
  })
})
