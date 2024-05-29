/**
 * @jest-environment node
 */
import { GET } from "./route"
import {
  createSelect,
  mockSupabaseClient,
} from "../../../../../../test-utils/mock-supabase-client"
import { setupJestOpenApi } from "../../../../../../test-utils/setup-jest-openapi"
import { invokeApiHandler } from "../../../../../../test-utils/invoke-api-handler"
import { createMockSilo } from "../../../../../../test-utils/factories/silo-factory"
import { createMockTokens } from "../../../../../../test-utils/factories/token-factory"

jest.mock("../../../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

describe("Silo tokens route", () => {
  beforeAll(setupJestOpenApi)

  beforeEach(() => {
    mockSupabaseClient
      .from("silos")
      .select.mockImplementation(() => createSelect())

    mockSupabaseClient
      .from("tokens")
      .select.mockImplementation(() => createSelect())
  })

  describe("GET", () => {
    it("returns a 404 for a non-existant silo", async () => {
      await expect(async () =>
        invokeApiHandler("GET", "/api/silos/1/tokens", GET),
      ).rejects.toThrow("Not Found")
    })

    it("returns the silo tokens", async () => {
      const mockTokens = createMockTokens(2)

      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))

      mockSupabaseClient
        .from("tokens")
        .select.mockImplementation(() => createSelect(mockTokens))

      const res = await invokeApiHandler("GET", "/api/silos/1/tokens", GET)

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        items: Array.from({ length: 2 }, (_, index) => ({
          address: mockTokens[index].address,
          bridgeDeploymentStatus: mockTokens[index].bridge_deployment_status,
          createdAt: mockTokens[index].created_at,
          decimals: mockTokens[index].decimals,
          deploymentStatus: mockTokens[index].deployment_status,
          id: mockTokens[index].id,
          name: mockTokens[index].name,
          symbol: mockTokens[index].symbol,
        })),
      })
    })

    it("returns an empty list if no tokens", async () => {
      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))

      mockSupabaseClient
        .from("tokens")
        .select.mockImplementation(() => createSelect())

      const res = await invokeApiHandler("GET", "/api/silos/1/tokens", GET)

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        items: [],
      })
    })
  })
})
