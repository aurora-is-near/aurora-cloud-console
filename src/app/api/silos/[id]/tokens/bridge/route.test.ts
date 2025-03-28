/**
 * @jest-environment node
 */
import { symbol } from "zod"
import { ethers } from "ethers"
import { DeploymentStatus } from "@/types/types"
import { createBridgedToken } from "@/actions/bridged-tokens/create-bridged-token"
import { POST } from "./route"
import {
  createInsertOrUpdate,
  createSelect,
  mockSupabaseClient,
} from "../../../../../../../test-utils/mock-supabase-client"
import { setupJestOpenApi } from "../../../../../../../test-utils/setup-jest-openapi"
import { invokeApiHandler } from "../../../../../../../test-utils/invoke-api-handler"
import { createMockSilo } from "../../../../../../../test-utils/factories/silo-factory"
import { createMockSiloBridgedToken } from "../../../../../../../test-utils/factories/silo-bridged-token-factory"
import { createMockBridgedToken } from "../../../../../../../test-utils/factories/bridged-token-factory"

jest.mock("ethers")
jest.mock("../../../../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

jest.mock("near-api-js", () => ({
  ...jest.requireActual("near-api-js"),
  Account: jest.fn(() => ({
    getAccountBalance: jest.fn(() => ({
      total: "33137693971864085399999999",
      available: "18370803971864085399999999",
      staked: "0",
    })),
    viewFunction: jest.fn(() => ({
      total: "12345678901234567890",
      available: "42",
    })),
  })),
  connect: jest.fn(() => ({
    connection: {
      provider: {
        txStatus: jest.fn(() => ({ status: { SuccessValue: "" } })),
      },
    },
  })),
}))

jest.mock("@/utils/contract-changer-api/contract-changer-api-client", () => ({
  contractChangerApiClient: {
    mirrorErc20Token: jest.fn(({ token }) => ({
      tx_hash: `mock_tx_hash_${token}`,
    })),
    makeStorageDeposit: jest.fn(() => ({
      tx_hash: "mock_storage_deposit_tx_hash",
    })),
  },
}))

describe("Bridge silo token route", () => {
  beforeAll(setupJestOpenApi)

  beforeEach(() => {
    mockSupabaseClient
      .from("silos")
      .select.mockImplementation(() => createSelect())
    mockSupabaseClient
      .from("silo_config_transactions")
      .select.mockReturnValue(createSelect([]))
    mockSupabaseClient
      .from("bridged_tokens")
      .select.mockImplementation(() => createSelect())
    ;(ethers.Contract as jest.Mock).mockImplementation(() => ({
      symbol: () => {
        throw new Error("Not implemented")
      },
    }))
  })

  describe("POST", () => {
    it("returns a 404 for a non-existant silo", async () => {
      const res = await invokeApiHandler(
        "POST",
        "/api/silos/1/tokens/bridge",
        POST,
      )

      expect(res.status).toBe(404)
      expect(res.body).toEqual({ message: "Not Found" })
    })

    describe("by ID", () => {
      it("creates and activates a token if the contract is deployed", async () => {
        const mockToken = createMockBridgedToken()
        const mockSilo = createMockSilo()

        ;(ethers.Contract as jest.Mock).mockImplementation(() => ({
          symbol: () => mockToken.symbol,
        }))

        mockSupabaseClient
          .from("silos")
          .select.mockImplementation(() => createSelect(mockSilo))

        mockSupabaseClient
          .from("bridged_tokens")
          .select.mockImplementation(() =>
            createSelect({
              ...mockToken,
              silo_bridged_tokens: [],
            }),
          )

        const res = await invokeApiHandler(
          "POST",
          "/api/silos/1/tokens/bridge",
          POST,
          {
            body: { tokenId: mockToken.id },
          },
        )

        expect(res.status).toBe(200)
        expect(res.body).toEqual({
          isDeploymentPending: false,
        })
      })

      it("creates and activates a token if it is the base token", async () => {
        const mockToken = createMockBridgedToken()
        const mockSilo = createMockSilo({ base_token_symbol: mockToken.symbol })

        mockSupabaseClient
          .from("silos")
          .select.mockImplementation(() => createSelect(mockSilo))

        mockSupabaseClient
          .from("bridged_tokens")
          .select.mockImplementation(() =>
            createSelect({
              ...mockToken,
              silo_bridged_tokens: [],
            }),
          )

        const res = await invokeApiHandler(
          "POST",
          "/api/silos/1/tokens/bridge",
          POST,
          {
            body: { tokenId: mockToken.id },
          },
        )

        expect(res.status).toBe(200)
        expect(res.body).toEqual({
          isDeploymentPending: false,
        })

        expect(ethers.Contract).not.toHaveBeenCalled()
      })

      it("creates a token in the pending state if the contract is not deployed", async () => {
        const mockToken = createMockBridgedToken()
        const mockSilo = createMockSilo()

        mockSupabaseClient
          .from("silos")
          .select.mockImplementation(() => createSelect(mockSilo))

        mockSupabaseClient
          .from("bridged_tokens")
          .select.mockImplementation(() =>
            createSelect({
              ...mockToken,
              silo_bridged_tokens: [],
            }),
          )

        const res = await invokeApiHandler(
          "POST",
          "/api/silos/1/tokens/bridge",
          POST,
          {
            body: { tokenId: mockToken.id },
          },
        )

        expect(res.status).toBe(200)
        expect(res.body).toEqual({
          isDeploymentPending: true,
        })
      })

      it("returns a 404 for a non-existant token", async () => {
        mockSupabaseClient
          .from("silos")
          .select.mockImplementation(() => createSelect(createMockSilo()))

        const res = await invokeApiHandler(
          "POST",
          "/api/silos/1/tokens/bridge",
          POST,
          {
            body: { tokenId: 1 },
          },
        )

        expect(res.status).toBe(404)
        expect(res.body).toEqual({ message: "Not Found" })
      })

      it("returns a 400 if the token is already deployed", async () => {
        const mockSilo = createMockSilo()
        const mockToken = createMockSiloBridgedToken({
          is_deployment_pending: false,
        })

        ;(ethers.Contract as jest.Mock).mockImplementation(() => ({
          symbol: () => mockToken.symbol,
        }))

        mockSupabaseClient
          .from("silos")
          .select.mockImplementation(() => createSelect(mockSilo))

        mockSupabaseClient
          .from("bridged_tokens")
          .select.mockImplementation(() =>
            createSelect({
              ...mockToken,
              silo_bridged_tokens: [
                {
                  bridged_token_id: mockToken.id,
                  silo_id: mockSilo.id,
                },
              ],
            }),
          )

        const res = await invokeApiHandler(
          "POST",
          "/api/silos/1/tokens/bridge",
          POST,
          {
            body: { tokenId: mockToken.id },
          },
        )

        expect(res.status).toBe(400)
        expect(res.body).toEqual({
          message: `${mockToken.symbol} is already bridged for this silo`,
        })

        expect(
          mockSupabaseClient.from("silo_bridged_tokens").insert,
        ).not.toHaveBeenCalled()
      })
    })

    describe("by symbol and address", () => {
      it("creates a new token", async () => {
        const mockToken = createMockSiloBridgedToken({ id: 42 })
        const insertQueries = createInsertOrUpdate(mockToken)

        insertQueries.select.mockReturnValue(
          createSelect({
            ...mockToken,
            bridge_deployment_status: "PENDING",
          }),
        )

        mockSupabaseClient
          .from("silos")
          .select.mockImplementation(() => createSelect(createMockSilo()))

        const res = await invokeApiHandler(
          "POST",
          "/api/silos/1/tokens/bridge",
          POST,
          {
            body: {
              symbol: mockToken.symbol,
              address: mockToken.aurora_address,
            },
          },
        )

        expect(res).toSatisfyApiSpec()
        expect(res.body).toEqual({
          isDeploymentPending: true,
        })

        expect(
          mockSupabaseClient.from("bridged_token_requests").insert,
        ).toHaveBeenCalledTimes(1)

        expect(
          mockSupabaseClient.from("bridged_token_requests").insert,
        ).toHaveBeenCalledWith({
          address: "0x",
          silo_id: 1,
          symbol: "TEST",
        })
      })

      it("returns a 400 if the token is already deployed", async () => {
        const mockToken = createMockSiloBridgedToken({
          is_deployment_pending: false,
        })

        ;(ethers.Contract as jest.Mock).mockImplementation(() => ({
          symbol: () => mockToken.symbol,
        }))

        mockSupabaseClient
          .from("silos")
          .select.mockImplementation(() => createSelect(createMockSilo()))

        const res = await invokeApiHandler(
          "POST",
          "/api/silos/1/tokens/bridge",
          POST,
          {
            body: {
              symbol: mockToken.symbol,
              address: mockToken.aurora_address,
            },
          },
        )

        expect(res.status).toBe(400)
        expect(res.body).toEqual({ message: "Token is already deployed" })
        expect(
          mockSupabaseClient.from("silo_bridged_tokens").insert,
        ).not.toHaveBeenCalled()
        expect(
          mockSupabaseClient.from("bridged_token_requests").insert,
        ).not.toHaveBeenCalled()
      })
    })
  })
})
