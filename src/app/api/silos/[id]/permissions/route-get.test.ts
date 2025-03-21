/**
 * @jest-environment node
 */
import { setupJestOpenApi } from "../../../../../../test-utils/setup-jest-openapi"
import { invokeApiHandler } from "../../../../../../test-utils/invoke-api-handler"

import { GET } from "./route"
import {
  createSelect,
  mockSupabaseClient,
} from "../../../../../../test-utils/mock-supabase-client"
import { createMockSilo } from "../../../../../../test-utils/factories/silo-factory"
import {
  createMockSiloWhitelistAddress,
  createMockSiloWhitelistAddresses,
} from "../../../../../../test-utils/factories/silo-whitelist-addresses-factory"

jest.mock("../../../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

describe("Silo whitelist permissions", () => {
  beforeAll(setupJestOpenApi)

  beforeEach(() => {
    mockSupabaseClient.from("silos").select.mockReturnValue(createSelect(null))
    mockSupabaseClient
      .from("silo_whitelist_addresses")
      .select.mockReturnValue(createSelect([]))
  })

  describe("GET", () => {
    it("returns the whitelists", async () => {
      mockSupabaseClient.from("silos").select.mockReturnValue(
        createSelect(
          createMockSilo({
            is_make_txs_public: true,
            is_deploy_contracts_public: false,
          }),
        ),
      )

      mockSupabaseClient
        .from("silo_whitelist_addresses")
        .select.mockReturnValue(
          createSelect([
            createMockSiloWhitelistAddress({ address: "0x1" }),
            createMockSiloWhitelistAddress({ address: "0x2" }),
          ]),
        )

      const res = await invokeApiHandler(
        "GET",
        "/api/silos/1/permissions",
        GET,
        { params: { id: "1" } },
      )

      expect(res.status).toBe(200)
      expect(res.body).toEqual({
        items: [
          {
            type: "MAKE_TRANSACTION",
            addresses: ["0x1", "0x2"],
            isEnabled: false,
          },
          {
            type: "DEPLOY_CONTRACT",
            addresses: ["0x1", "0x2"],
            isEnabled: true,
          },
        ],
      })
    })

    it("returns a 404 for a non-existant silo", async () => {
      const res = await invokeApiHandler(
        "GET",
        "/api/silos/1/permissions",
        GET,
        { params: { id: "1" } },
      )

      expect(res.status).toBe(404)
      expect(res.body).toEqual({ message: "Not Found" })
    })
  })
})
