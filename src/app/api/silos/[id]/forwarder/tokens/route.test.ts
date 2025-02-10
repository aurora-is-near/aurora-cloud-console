/**
 * @jest-environment node
 */
import nock from "nock"
import * as ethers from "ethers"
import { GET } from "./route"
import { setupJestOpenApi } from "../../../../../../../test-utils/setup-jest-openapi"
import { invokeApiHandler } from "../../../../../../../test-utils/invoke-api-handler"
import {
  createSelect,
  mockSupabaseClient,
} from "../../../../../../../test-utils/mock-supabase-client"
import { createMockSilo } from "../../../../../../../test-utils/factories/silo-factory"

jest.mock("ethers")
jest.mock("../../../../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

const mockSilo = createMockSilo()

nock.disableNetConnect()

describe("Forwarder tokens route", () => {
  beforeAll(setupJestOpenApi)

  beforeEach(() => {
    mockSupabaseClient
      .from("silos")
      .select.mockImplementation(() => createSelect(mockSilo))
    ;(ethers.Contract as jest.Mock).mockImplementation(() => ({
      symbol: () => {
        throw new Error("Not implemented")
      },
    }))
  })

  describe("GET", () => {
    it("returns the supported tokens", async () => {
      ;(ethers.Contract as jest.Mock).mockImplementation(
        (tokenContractAddress) => ({
          symbol: () => {
            if (
              tokenContractAddress ===
              "0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d"
            ) {
              return "NEAR"
            }

            if (
              tokenContractAddress ===
              "0x80Da25Da4D783E57d2FCdA0436873A193a4BEccF"
            ) {
              return "USDt"
            }

            throw new Error("Not implemented")
          },
        }),
      )

      const res = await invokeApiHandler(
        "GET",
        `/api/silos/1/forwarder/tokens`,
        GET,
      )

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        items: [
          {
            address: "near",
            decimals: 24,
            symbol: "NEAR",
          },
          {
            address: "usdt.tether-token.near",
            decimals: 6,
            symbol: "USDt",
          },
        ],
      })
    })

    it("returns an empty array if there are no supported tokens", async () => {
      const res = await invokeApiHandler(
        "GET",
        `/api/silos/1/forwarder/tokens`,
        GET,
      )

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({ items: [] })
    })

    it("returns a 404 for a non-existant silo", async () => {
      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect())

      const res = await invokeApiHandler(
        "GET",
        `/api/silos/1/forwarder/tokens`,
        GET,
      )

      expect(res.status).toBe(404)
      expect(res.body).toEqual({ message: "Not Found" })
    })
  })
})
