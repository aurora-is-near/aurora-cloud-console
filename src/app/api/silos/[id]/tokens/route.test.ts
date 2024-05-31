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
import { DeploymentStatus } from "@/types/types"

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
      const bridgeAddresses = [
        { network: "ethereum", address: "0x123" },
        { network: "near", address: "0x456" },
      ]

      const mockTokens = createMockTokens(2, {
        bridge_deployment_status: "DEPLOYED",
        bridge_addresses: bridgeAddresses.map(
          ({ network, address }) => `${network}:${address}`,
        ),
      })

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
          createdAt: mockTokens[index].created_at,
          decimals: mockTokens[index].decimals,
          deploymentStatus: mockTokens[index].deployment_status,
          id: mockTokens[index].id,
          name: mockTokens[index].name,
          symbol: mockTokens[index].symbol,
          iconUrl: mockTokens[index].icon_url,
          bridge: {
            deploymentStatus: mockTokens[index].bridge_deployment_status,
            isFast: mockTokens[index].fast_bridge,
            addresses: bridgeAddresses,
            origin: mockTokens[index].bridge_origin,
          },
        })),
      })
    })

    it.each(["NOT_DEPLOYED", "PENDING"] as DeploymentStatus[])(
      "returns the silo tokens with no bridge when the token status is %s",
      async (status) => {
        const mockTokens = createMockTokens(1, {
          bridge_deployment_status: status,
        })

        mockSupabaseClient
          .from("silos")
          .select.mockImplementation(() => createSelect(createMockSilo()))

        mockSupabaseClient
          .from("tokens")
          .select.mockImplementation(() => createSelect(mockTokens))

        const res = await invokeApiHandler("GET", "/api/silos/1/tokens", GET)

        const [mockToken] = mockTokens

        expect(res).toSatisfyApiSpec()
        expect(res.body).toEqual({
          items: [
            {
              address: mockToken.address,
              createdAt: mockToken.created_at,
              decimals: mockToken.decimals,
              deploymentStatus: mockToken.deployment_status,
              iconUrl: mockToken.icon_url,
              id: mockToken.id,
              name: mockToken.name,
              symbol: mockToken.symbol,
              bridge: null,
            },
          ],
        })
      },
    )

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
