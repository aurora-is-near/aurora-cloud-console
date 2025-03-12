/**
 * @jest-environment node
 */
import nock from "nock"
import * as ethers from "ethers"
import { DELETE, GET, POST, PUT } from "./route"
import { setupJestOpenApi } from "../../../../../../../test-utils/setup-jest-openapi"
import { invokeApiHandler } from "../../../../../../../test-utils/invoke-api-handler"
import {
  createSelect,
  mockSupabaseClient,
} from "../../../../../../../test-utils/mock-supabase-client"
import { createMockSilo } from "../../../../../../../test-utils/factories/silo-factory"
import { cleanUpNock } from "../../../../../../../test-utils/cleanUpNock"

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
  })

  afterAll(cleanUpNock)

  describe("GET", () => {
    it("returns the tokens", async () => {
      nock("https://forwarder.mainnet.aurora.dev")
        .get("/api/v1/supported_tokens")
        .query((query) => {
          expect(query).toEqual({
            target_network: mockSilo.engine_account,
          })

          return true
        })
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
            contractDeployed: true,
            enabled: true,
          },
          {
            symbol: "wNEAR",
            decimals: 24,
            contractDeployed: false,
            enabled: false,
          },
          {
            symbol: "USDt",
            decimals: 6,
            contractDeployed: true,
            enabled: false,
          },
          {
            symbol: "USDC",
            decimals: 6,
            contractDeployed: false,
            enabled: false,
          },
          {
            symbol: "AURORA",
            decimals: 18,
            contractDeployed: false,
            enabled: false,
          },
        ],
      })
    })

    it.each([null, []])(
      "returns the expected result if the supported tokens is %p",
      async (supportedTokens) => {
        nock("https://forwarder.mainnet.aurora.dev")
          .get("/api/v1/supported_tokens")
          .query((query) => {
            expect(query).toEqual({
              target_network: mockSilo.engine_account,
            })

            return true
          })
          .reply(200, {
            result: {
              tokens: supportedTokens,
            },
          })
        ;(ethers.Contract as jest.Mock).mockImplementation(() => ({
          symbol: () => {
            throw new Error("Not implemented")
          },
        }))

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
              contractDeployed: false,
              enabled: false,
            },
            {
              symbol: "wNEAR",
              decimals: 24,
              contractDeployed: false,
              enabled: false,
            },
            {
              symbol: "USDt",
              decimals: 6,
              contractDeployed: false,
              enabled: false,
            },
            {
              symbol: "USDC",
              decimals: 6,
              contractDeployed: false,
              enabled: false,
            },
            {
              symbol: "AURORA",
              decimals: 18,
              contractDeployed: false,
              enabled: false,
            },
          ],
        })
      },
    )

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

  describe("POST", () => {
    it("adds some supported tokens", async () => {
      const silo = createMockSilo()

      nock("https://forwarder.mainnet.aurora.dev")
        .post("/api/v1/supported_tokens/add", (body) => {
          expect(body).toEqual({
            target_network: silo.engine_account,
            tokens: [
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

          return true
        })
        .reply(200, {
          result: {
            message: "ok",
          },
        })

      const res = await invokeApiHandler(
        "POST",
        "/api/silos/1/forwarder/tokens",
        POST,
        {
          body: {
            tokens: ["NEAR", "USDt"],
          },
        },
      )

      expect(res).toSatisfyApiSpec()
      expect(res.status).toBe(200)
    })

    it("returns a 400 for an unknown token", async () => {
      const res = await invokeApiHandler(
        "POST",
        "/api/silos/1/forwarder/tokens",
        POST,
        {
          body: {
            tokens: ["NOGOOD"],
          },
        },
      )

      expect(res.status).toBe(400)
      expect(res.body).toEqual({ message: "Unknown token: NOGOOD" })
    })

    it("returns a 400 for an token with no contract", async () => {
      ;(ethers.Contract as jest.Mock).mockImplementation(() => ({
        symbol: () => {
          throw new Error("Not implemented")
        },
      }))

      const res = await invokeApiHandler(
        "POST",
        "/api/silos/1/forwarder/tokens",
        POST,
        {
          body: {
            tokens: ["NEAR"],
          },
        },
      )

      expect(res.status).toBe(400)
      expect(res.body).toEqual({ message: "Token contract not deployed: NEAR" })
    })
  })

  describe("DELETE", () => {
    it("removes some tokens", async () => {
      const silo = createMockSilo()

      nock("https://forwarder.mainnet.aurora.dev")
        .post("/api/v1/supported_tokens/remove", (body) => {
          expect(body).toEqual({
            target_network: silo.engine_account,
            token_addresses: ["near", "usdt.tether-token.near"],
          })

          return true
        })
        .reply(200, {
          result: {
            message: "ok",
          },
        })

      const res = await invokeApiHandler(
        "DELETE",
        "/api/silos/1/forwarder/tokens",
        DELETE,
        {
          body: {
            tokens: ["NEAR", "USDt"],
          },
        },
      )

      expect(res).toSatisfyApiSpec()
      expect(res.status).toBe(200)
    })

    it("returns a 400 for an unknown token", async () => {
      const res = await invokeApiHandler(
        "DELETE",
        "/api/silos/1/forwarder/tokens",
        DELETE,
        {
          body: {
            tokens: ["NOGOOD"],
          },
        },
      )

      expect(res.status).toBe(400)
      expect(res.body).toEqual({ message: "Unknown token: NOGOOD" })
    })

    it("returns a 400 for an token with no contract", async () => {
      ;(ethers.Contract as jest.Mock).mockImplementation(() => ({
        symbol: () => {
          throw new Error("Not implemented")
        },
      }))

      const res = await invokeApiHandler(
        "DELETE",
        "/api/silos/1/forwarder/tokens",
        DELETE,
        {
          body: {
            tokens: ["NEAR"],
          },
        },
      )

      expect(res.status).toBe(400)
      expect(res.body).toEqual({ message: "Token contract not deployed: NEAR" })
    })
  })

  describe("updateForwarderTokens", () => {
    it("updates some tokens", async () => {
      nock("https://forwarder.mainnet.aurora.dev")
        .get("/api/v1/supported_tokens")
        .query((query) => {
          expect(query).toEqual({
            target_network: mockSilo.engine_account,
          })

          return true
        })
        .reply(200, {
          result: {
            tokens: [
              {
                address: "near",
                decimals: 24,
                symbol: "NEAR",
              },
              {
                address:
                  "aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near",
                decimals: 18,
                symbol: "AURORA",
              },
            ],
          },
        })
        .post("/api/v1/supported_tokens/add", (body) => {
          // We expect USDt to be added
          expect(body).toEqual({
            target_network: mockSilo.engine_account,
            tokens: [
              {
                address: "usdt.tether-token.near",
                decimals: 6,
                symbol: "USDt",
              },
            ],
          })

          return true
        })
        .reply(200, {
          result: {
            message: "ok",
          },
        })
        .post("/api/v1/supported_tokens/remove", (body) => {
          // We expect AURORA to be removed
          expect(body).toEqual({
            target_network: mockSilo.engine_account,
            token_addresses: [
              "aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near",
            ],
          })

          return true
        })
        .reply(200, {
          result: {
            message: "ok",
          },
        })

      const res = await invokeApiHandler(
        "PUT",
        "/api/silos/1/forwarder/tokens",
        PUT,
        {
          body: {
            tokens: ["NEAR", "USDt"],
          },
        },
      )

      expect(res).toSatisfyApiSpec()
      expect(res.status).toBe(200)
    })

    it("returns a 400 for an unknown token", async () => {
      nock("https://forwarder.mainnet.aurora.dev")
        .get("/api/v1/supported_tokens")
        .query(true)
        .reply(200, {
          result: {
            tokens: [],
          },
        })

      const res = await invokeApiHandler(
        "PUT",
        "/api/silos/1/forwarder/tokens",
        PUT,
        {
          body: {
            tokens: ["NOGOOD"],
          },
        },
      )

      expect(res.status).toBe(400)
      expect(res.body).toEqual({ message: "Unknown token: NOGOOD" })
    })

    it("returns a 400 when trying to add a token with no contract", async () => {
      nock("https://forwarder.mainnet.aurora.dev")
        .get("/api/v1/supported_tokens")
        .query(true)
        .reply(200, {
          result: {
            tokens: [],
          },
        })
      ;(ethers.Contract as jest.Mock).mockImplementation(() => ({
        symbol: () => {
          throw new Error("Not implemented")
        },
      }))

      const res = await invokeApiHandler(
        "PUT",
        "/api/silos/1/forwarder/tokens",
        PUT,
        {
          body: {
            tokens: ["NEAR"],
          },
        },
      )

      expect(res.status).toBe(400)
      expect(res.body).toEqual({ message: "Token contract not deployed: NEAR" })
    })

    it("still removes a token with no contract", async () => {
      nock("https://forwarder.mainnet.aurora.dev")
        .get("/api/v1/supported_tokens")
        .query(true)
        .reply(200, {
          result: {
            tokens: [
              {
                address: "near",
                decimals: 24,
                symbol: "NEAR",
              },
            ],
          },
        })
        .post("/api/v1/supported_tokens/remove", (body) => {
          // We expect AURORA to be removed
          expect(body).toEqual({
            target_network: mockSilo.engine_account,
            token_addresses: ["near"],
          })

          return true
        })
        .reply(200, {
          result: {
            message: "ok",
          },
        })

      const res = await invokeApiHandler(
        "PUT",
        "/api/silos/1/forwarder/tokens",
        PUT,
        {
          body: {
            tokens: [],
          },
        },
      )

      expect(res).toSatisfyApiSpec()
      expect(res.status).toBe(200)
    })
  })
})
