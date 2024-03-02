/**
 * @jest-environment node
 */
import { NextRequest } from "next/server"
import { GET } from "./route"
import { createMockApiContext } from "../../../../test-utils/create-mock-api-context"
import {
  createSelect,
  mockSupabaseClient,
} from "../../../../test-utils/mock-supabase-client"

jest.mock("../../../utils/api", () => ({
  createApiEndpoint: jest.fn((name, handler) => handler),
}))

jest.mock("../../../utils/proxy-api/client", () => ({
  proxyApiClient: {
    view: jest.fn(async () => ({ responses: [] })),
    update: jest.fn(),
  },
}))

describe("Deals route", () => {
  beforeEach(() => {
    mockSupabaseClient
      .from("deals")
      .select.mockImplementation(() => createSelect([]))

    mockSupabaseClient
      .from("lists")
      .select.mockImplementation(() => createSelect([]))
  })

  it("GET", async () => {
    const req = new NextRequest(new URL(`http://test.com/api/deals`))
    const ctx = createMockApiContext()
    const result = await GET(req, ctx)

    expect(result).toEqual({
      items: [],
    })
  })
})
