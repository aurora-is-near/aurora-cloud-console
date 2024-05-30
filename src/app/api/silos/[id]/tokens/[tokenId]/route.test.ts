/**
 * @jest-environment node
 */
import { GET } from "./route"
import {
  createSelect,
  mockSupabaseClient,
} from "../../../../../../../test-utils/mock-supabase-client"
import { setupJestOpenApi } from "../../../../../../../test-utils/setup-jest-openapi"
import { invokeApiHandler } from "../../../../../../../test-utils/invoke-api-handler"
import { createMockSilo } from "../../../../../../../test-utils/factories/silo-factory"
import { createMockToken } from "../../../../../../../test-utils/factories/token-factory"
import { DeploymentStatus } from "@/types/types"

jest.mock("../../../../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

describe("Silo token route", () => {
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
        invokeApiHandler("GET", "/api/silos/1/tokens/2", GET),
      ).rejects.toThrow("Not Found")
    })

    it("returns a 404 for a non-existant token", async () => {
      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))

      await expect(async () =>
        invokeApiHandler("GET", "/api/silos/1/tokens/2", GET),
      ).rejects.toThrow("Not Found")
    })

    it("returns the silo token", async () => {
      const bridgeAddresses = [
        { network: "ethereum", address: "0x123" },
        { network: "near", address: "0x456" },
      ]

      const mockToken = createMockToken({
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
        .select.mockImplementation(() => createSelect(mockToken))

      const res = await invokeApiHandler("GET", "/api/silos/1/tokens/2", GET)

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        address: mockToken.address,
        createdAt: mockToken.created_at,
        decimals: mockToken.decimals,
        deploymentStatus: mockToken.deployment_status,
        id: mockToken.id,
        name: mockToken.name,
        symbol: mockToken.symbol,
        bridge: {
          deploymentStatus: mockToken.bridge_deployment_status,
          isFast: mockToken.fast_bridge,
          addresses: bridgeAddresses,
          origin: mockToken.bridge_origin,
        },
      })
    })

    it.each(["NOT_DEPLOYED", "PENDING"] as DeploymentStatus[])(
      "returns the silo token with no bridge when the token status is %s",
      async (status) => {
        const mockToken = createMockToken({
          bridge_deployment_status: status,
        })

        mockSupabaseClient
          .from("silos")
          .select.mockImplementation(() => createSelect(createMockSilo()))

        mockSupabaseClient
          .from("tokens")
          .select.mockImplementation(() => createSelect(mockToken))

        const res = await invokeApiHandler("GET", "/api/silos/1/tokens/2", GET)

        expect(res).toSatisfyApiSpec()
        expect(res.body).toEqual({
          address: mockToken.address,
          createdAt: mockToken.created_at,
          decimals: mockToken.decimals,
          deploymentStatus: mockToken.deployment_status,
          id: mockToken.id,
          name: mockToken.name,
          symbol: mockToken.symbol,
          bridge: null,
        })
      },
    )
  })
})
