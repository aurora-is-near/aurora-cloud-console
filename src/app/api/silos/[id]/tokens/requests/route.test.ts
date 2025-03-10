/**
 * @jest-environment node
 */
import { DeploymentStatus } from "@/types/types"
import { GET } from "./route"
import {
  createSelect,
  mockSupabaseClient,
} from "../../../../../../../test-utils/mock-supabase-client"
import { setupJestOpenApi } from "../../../../../../../test-utils/setup-jest-openapi"
import { invokeApiHandler } from "../../../../../../../test-utils/invoke-api-handler"
import { createMockSilo } from "../../../../../../../test-utils/factories/silo-factory"
import {
  createMockSiloBridgedToken,
  createMockSiloBridgedTokens,
} from "../../../../../../../test-utils/factories/silo-bridged-token-factory"

jest.mock("../../../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

describe("Silo token requests route", () => {
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
      const res = await invokeApiHandler("GET", "/api/silos/1/tokens", GET)

      expect(res.status).toBe(404)
      expect(res.body).toEqual({ message: "Not Found" })
    })

    it("returns the silo tokens", async () => {
      const mockTokens = [
        createMockSiloBridgedToken({ is_deployment_pending: true }),
        createMockSiloBridgedToken({ is_deployment_pending: false }),
      ]

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
          id: mockTokens[index].id,
          createdAt: mockTokens[index].created_at,
          name: mockTokens[index].name,
          symbol: mockTokens[index].symbol,
          decimals: mockTokens[index].decimals,
          aurora_address: mockTokens[index].aurora_address,
          near_address: mockTokens[index].near_address,
          ethereum_address: mockTokens[index].ethereum_address,
          isDeployed: mockTokens[index].is_deployment_pending,
          iconUrl: mockTokens[index].icon_url,
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
