/**
 * @jest-environment node
 */
import nock from "nock"
import * as ethers from "ethers"
import { symbol } from "zod"
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
    it("returns the tokens", async () => {
      nock("https://forwarder.mainnet.aurora.dev")
        .get("/api/v1/supported_tokens")
        .reply(200, {
          result: {
            tokens: [
              {
                address: "near",
                decimals: 24,
                symbol: "NEAR",
              },
              {
                address: "aurora",
                decimals: 18,
                symbol: "ETH",
              },
            ],
          },
        })
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
            symbol: "NEAR",
            decimals: 24,
            confirmed: true,
            enabled: true,
          },
          {
            symbol: "wNEAR",
            decimals: 24,
            confirmed: false,
            enabled: false,
          },
          {
            symbol: "USDt",
            decimals: 6,
            confirmed: true,
            enabled: false,
          },
          {
            symbol: "USDC",
            decimals: 6,
            confirmed: false,
            enabled: false,
          },
          {
            symbol: "AURORA",
            decimals: 18,
            confirmed: false,
            enabled: false,
          },
        ],
      })
    })

    it("returns the expected result if there are no supported tokens", async () => {
      nock("https://forwarder.mainnet.aurora.dev")
        .persist()
        .get("/api/v1/supported_tokens")
        .reply(200, {
          result: {
            tokens: [],
          },
        })

      const res = await invokeApiHandler(
        "GET",
        `/api/silos/1/forwarder/tokens`,
        GET,
      )

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        items: [
          {
            symbol: "NEAR",
            decimals: 24,
            confirmed: false,
            enabled: false,
          },
          {
            symbol: "wNEAR",
            decimals: 24,
            confirmed: false,
            enabled: false,
          },
          {
            symbol: "USDt",
            decimals: 6,
            confirmed: false,
            enabled: false,
          },
          {
            symbol: "USDC",
            decimals: 6,
            confirmed: false,
            enabled: false,
          },
          {
            symbol: "AURORA",
            decimals: 18,
            confirmed: false,
            enabled: false,
          },
        ],
      })
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
