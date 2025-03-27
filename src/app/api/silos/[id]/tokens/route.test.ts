/**
 * @jest-environment node
 */
import { ethers } from "ethers"
import { GET } from "./route"
import {
  createSelect,
  mockSupabaseClient,
} from "../../../../../../test-utils/mock-supabase-client"
import { setupJestOpenApi } from "../../../../../../test-utils/setup-jest-openapi"
import { invokeApiHandler } from "../../../../../../test-utils/invoke-api-handler"
import { createMockSilo } from "../../../../../../test-utils/factories/silo-factory"
import { createMockBridgedToken } from "../../../../../../test-utils/factories/bridged-token-factory"

jest.mock("ethers")
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
      .from("bridged_tokens")
      .select.mockImplementation(() => createSelect())

    mockSupabaseClient
      .from("silo_bridged_tokens")
      .select.mockImplementation(() => createSelect())
    ;(ethers.Contract as jest.Mock).mockImplementation(() => ({
      symbol: () => {
        throw new Error("Not implemented")
      },
    }))
  })

  describe("GET", () => {
    it("returns a 404 for a non-existant silo", async () => {
      const res = await invokeApiHandler("GET", "/api/silos/1/tokens", GET)

      expect(res.status).toBe(404)
      expect(res.body).toEqual({ message: "Not Found" })
    })

    it("returns the silo tokens", async () => {
      const siloId = 1
      const mockTokens = [
        {
          ...createMockBridgedToken(),
          silo_bridged_tokens: [
            { silo_id: siloId, is_deployment_pending: true },
          ],
        },
        {
          ...createMockBridgedToken(),
          silo_bridged_tokens: [
            { silo_id: siloId, is_deployment_pending: false },
          ],
        },
      ]

      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))

      mockSupabaseClient
        .from("bridged_tokens")
        .select.mockImplementation(() => createSelect(mockTokens))

      mockSupabaseClient
        .from("silo_bridged_tokens")
        .select.mockImplementation(() => createSelect(mockTokens))

      const res = await invokeApiHandler("GET", "/api/silos/1/tokens", GET)

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        total: 2,
        items: Array.from({ length: 2 }, (_, index) => ({
          id: mockTokens[index].id,
          createdAt: mockTokens[index].created_at,
          name: mockTokens[index].name,
          symbol: mockTokens[index].symbol,
          decimals: mockTokens[index].decimals,
          aurora_address: mockTokens[index].aurora_address,
          near_address: mockTokens[index].near_address,
          ethereum_address: mockTokens[index].ethereum_address,
          isDeploymentPending:
            mockTokens[index].silo_bridged_tokens[0].is_deployment_pending,
          iconUrl: mockTokens[index].icon_url,
        })),
      })
    })

    it("returns an empty list if no tokens", async () => {
      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))

      mockSupabaseClient
        .from("bridged_tokens")
        .select.mockImplementation(() => createSelect())

      const res = await invokeApiHandler("GET", "/api/silos/1/tokens", GET)

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        items: [],
        total: 0,
      })
    })
  })

  it("checks if any tokens still marked as pending have subsequently been deployed", async () => {
    const siloId = 1
    const mockToken = {
      ...createMockBridgedToken(),
      silo_bridged_tokens: [{ silo_id: siloId, is_deployment_pending: true }],
    }

    mockSupabaseClient
      .from("silos")
      .select.mockImplementation(() => createSelect(createMockSilo()))

    mockSupabaseClient
      .from("bridged_tokens")
      .select.mockImplementation(() => createSelect([mockToken]))

    mockSupabaseClient
      .from("silo_bridged_tokens")
      .select.mockImplementation(() => createSelect([mockToken]))
    ;(ethers.Contract as jest.Mock).mockImplementation(() => ({
      symbol: () => mockToken.symbol,
    }))

    const res = await invokeApiHandler("GET", "/api/silos/1/tokens", GET)

    expect(res).toSatisfyApiSpec()
    expect(res.body).toEqual({
      total: 1,
      items: [
        expect.objectContaining({
          isDeploymentPending: false,
        }),
      ],
    })

    expect(
      mockSupabaseClient.from("silo_bridged_tokens").update,
    ).toHaveBeenCalledTimes(1)

    expect(
      mockSupabaseClient.from("silo_bridged_tokens").update,
    ).toHaveBeenCalledWith({
      is_deployment_pending: false,
    })
  })
})
