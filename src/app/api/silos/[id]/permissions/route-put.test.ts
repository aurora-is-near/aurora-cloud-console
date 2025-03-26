/**
 * @jest-environment node
 */
import { contractChangerApiClient } from "@/utils/contract-changer-api/contract-changer-api-client"

import {
  createInsertOrUpdate,
  createSelect,
  mockSupabaseClient,
} from "../../../../../../test-utils/mock-supabase-client"
import { setupJestOpenApi } from "../../../../../../test-utils/setup-jest-openapi"
import { invokeApiHandler } from "../../../../../../test-utils/invoke-api-handler"
import { createMockSilo } from "../../../../../../test-utils/factories/silo-factory"

import { PUT } from "./route"

const mockTxStatus = jest.fn()

jest.mock("../../../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

jest.mock("@/utils/contract-changer-api/contract-changer-api-client", () => ({
  contractChangerApiClient: {
    toggleWhitelist: jest.fn(() => ({ tx_hash: "mock_tx_hash" })),
  },
}))

jest.mock("near-api-js", () => ({
  ...jest.requireActual("near-api-js"),
  connect: jest.fn(() => ({
    connection: {
      provider: {
        txStatus: mockTxStatus,
      },
    },
  })),
}))

const mockSilo = createMockSilo({ base_token_symbol: "AURORA" })

describe("No silo", () => {
  beforeAll(setupJestOpenApi)

  it("[PUT] returns 404 if silo not found", async () => {
    const res = await invokeApiHandler("PUT", "/api/silos/1/permissions", PUT, {
      params: { id: "1" },
      body: { isEnabled: true, action: "MAKE_TRANSACTION" },
    })

    expect(res.status).toBe(404)
  })
})

describe("Silo whitelist permissions", () => {
  beforeAll(setupJestOpenApi)

  describe("Toggle whitelist", () => {
    beforeEach(() => {
      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))
    })

    it("returns 400 if action parameter is not passed", async () => {
      const res = await invokeApiHandler(
        "PUT",
        "/api/silos/1/permissions",
        PUT,
        {
          params: { id: "1" },
          body: { isEnabled: true },
        },
      )

      expect(res.status).toBe(400)
      expect(res.body).toEqual({
        message: "Missing action value in request (action must be provided)",
      })
    })

    it("returns 400 if isEnabled parameter is not passed", async () => {
      const res = await invokeApiHandler(
        "PUT",
        "/api/silos/1/permissions",
        PUT,
        {
          params: { id: "1" },
          body: { action: "MAKE_TRANSACTION" },
        },
      )

      expect(res.status).toBe(400)
      expect(res.body).toEqual({
        message:
          "Missing isEnabled value in request (isEnabled must be provided)",
      })
    })

    it("creates new tx if it doesn't exist", async () => {
      mockSupabaseClient
        .from("silo_config_transactions")
        .select.mockImplementation(() => createSelect(null))

      const res = await invokeApiHandler(
        "PUT",
        "/api/silos/1/permissions",
        PUT,
        {
          params: { id: "1" },
          body: { isEnabled: true, action: "MAKE_TRANSACTION" },
        },
      )

      expect(contractChangerApiClient.toggleWhitelist).toHaveBeenCalledTimes(1)
      expect(contractChangerApiClient.toggleWhitelist).toHaveBeenCalledWith({
        siloEngineAccountId: mockSilo.engine_account,
        action: "enable",
        whitelistKind: "address",
      })

      expect(
        mockSupabaseClient.from("silo_config_transactions").insert,
      ).toHaveBeenCalledTimes(1)

      expect(
        mockSupabaseClient.from("silo_config_transactions").insert,
      ).toHaveBeenCalledWith({
        silo_id: mockSilo.id,
        operation: "ENABLE_MAKE_TXS_WHITELIST",
        status: "PENDING",
        transaction_hash: "mock_tx_hash",
        target: mockSilo.engine_account,
      })

      expect(res.body).toEqual({
        action: "MAKE_TRANSACTION",
        status: "PENDING",
        isEnabled: false,
      })
    })

    it("creates new tx if it previous one failed", async () => {
      mockSupabaseClient
        .from("silo_config_transactions")
        .select.mockImplementation(() =>
          createSelect({
            status: "FAILED",
          }),
        )

      const res = await invokeApiHandler(
        "PUT",
        "/api/silos/1/permissions",
        PUT,
        {
          params: { id: "1" },
          body: { isEnabled: true, action: "MAKE_TRANSACTION" },
        },
      )

      expect(contractChangerApiClient.toggleWhitelist).toHaveBeenCalledTimes(1)
      expect(contractChangerApiClient.toggleWhitelist).toHaveBeenCalledWith({
        siloEngineAccountId: mockSilo.engine_account,
        action: "enable",
        whitelistKind: "address",
      })

      expect(
        mockSupabaseClient.from("silo_config_transactions").insert,
      ).toHaveBeenCalledTimes(1)

      expect(
        mockSupabaseClient.from("silo_config_transactions").insert,
      ).toHaveBeenCalledWith({
        silo_id: mockSilo.id,
        operation: "ENABLE_MAKE_TXS_WHITELIST",
        status: "PENDING",
        transaction_hash: "mock_tx_hash",
        target: mockSilo.engine_account,
      })

      expect(res.body).toEqual({
        action: "MAKE_TRANSACTION",
        status: "PENDING",
        isEnabled: false,
      })
    })

    it("creates new tx if it previous one already completed", async () => {
      mockSupabaseClient
        .from("silo_config_transactions")
        .select.mockImplementation(() =>
          createSelect({
            status: "SUCCESSFUL",
          }),
        )

      const res = await invokeApiHandler(
        "PUT",
        "/api/silos/1/permissions",
        PUT,
        {
          params: { id: "1" },
          body: { isEnabled: true, action: "MAKE_TRANSACTION" },
        },
      )

      expect(contractChangerApiClient.toggleWhitelist).toHaveBeenCalledTimes(1)
      expect(contractChangerApiClient.toggleWhitelist).toHaveBeenCalledWith({
        siloEngineAccountId: mockSilo.engine_account,
        action: "enable",
        whitelistKind: "address",
      })

      expect(
        mockSupabaseClient.from("silo_config_transactions").insert,
      ).toHaveBeenCalledTimes(1)

      expect(
        mockSupabaseClient.from("silo_config_transactions").insert,
      ).toHaveBeenCalledWith({
        silo_id: mockSilo.id,
        operation: "ENABLE_MAKE_TXS_WHITELIST",
        status: "PENDING",
        transaction_hash: "mock_tx_hash",
        target: mockSilo.engine_account,
      })

      expect(res.body).toEqual({
        action: "MAKE_TRANSACTION",
        status: "PENDING",
        isEnabled: false,
      })
    })

    it("check tx status if previous one is pending (and still pending)", async () => {
      mockSupabaseClient
        .from("silo_config_transactions")
        .select.mockImplementation(() =>
          createSelect({
            status: "PENDING",
          }),
        )

      mockTxStatus.mockResolvedValue({ status: "NotStarted" })

      const res = await invokeApiHandler(
        "PUT",
        "/api/silos/1/permissions",
        PUT,
        {
          params: { id: "1" },
          body: { isEnabled: true, action: "MAKE_TRANSACTION" },
        },
      )

      expect(contractChangerApiClient.toggleWhitelist).not.toHaveBeenCalled()
      expect(
        mockSupabaseClient.from("silo_config_transactions").insert,
      ).not.toHaveBeenCalledTimes(1)

      expect(mockSupabaseClient.from("silos").update).not.toHaveBeenCalled()
      expect(mockTxStatus).toHaveBeenCalledTimes(1)

      expect(
        mockSupabaseClient.from("silo_config_transactions").update,
      ).not.toHaveBeenCalled()

      expect(res.body).toEqual({
        action: "MAKE_TRANSACTION",
        status: "PENDING",
        isEnabled: false,
      })
    })

    it("check tx status changed to FAILED", async () => {
      mockSupabaseClient
        .from("silo_config_transactions")
        .select.mockImplementation(() =>
          createSelect({
            status: "PENDING",
          }),
        )

      mockTxStatus.mockResolvedValue({ status: { Failure: {} } })

      const res = await invokeApiHandler(
        "PUT",
        "/api/silos/1/permissions",
        PUT,
        {
          params: { id: "1" },
          body: { isEnabled: true, action: "MAKE_TRANSACTION" },
        },
      )

      expect(contractChangerApiClient.toggleWhitelist).not.toHaveBeenCalled()
      expect(
        mockSupabaseClient.from("silo_config_transactions").insert,
      ).not.toHaveBeenCalledTimes(1)

      expect(mockSupabaseClient.from("silos").update).not.toHaveBeenCalled()
      expect(mockTxStatus).toHaveBeenCalledTimes(1)

      expect(
        mockSupabaseClient.from("silo_config_transactions").update,
      ).toHaveBeenCalledTimes(1)
      expect(
        mockSupabaseClient.from("silo_config_transactions").update,
      ).toHaveBeenCalledWith({
        status: "FAILED",
      })

      expect(res.status).toBe(503)
    })

    it("check tx status changed to SUCCESSFUL", async () => {
      mockSupabaseClient
        .from("silo_config_transactions")
        .select.mockReturnValue(
          createSelect({
            status: "PENDING",
            operation: "MAKE_TRANSACTION",
            transaction_hash: "mock_tx_hash",
          }),
        )

      mockSupabaseClient
        .from("silos")
        .update.mockReturnValue(createInsertOrUpdate(mockSilo))

      mockTxStatus.mockResolvedValue({ status: { SuccessValue: "" } })

      const res = await invokeApiHandler(
        "PUT",
        "/api/silos/1/permissions",
        PUT,
        {
          params: { id: "1" },
          body: { isEnabled: true, action: "MAKE_TRANSACTION" },
        },
      )

      expect(contractChangerApiClient.toggleWhitelist).not.toHaveBeenCalled()
      expect(
        mockSupabaseClient.from("silo_config_transactions").insert,
      ).not.toHaveBeenCalled()

      expect(mockTxStatus).toHaveBeenCalledTimes(1)

      expect(
        mockSupabaseClient.from("silo_config_transactions").update,
      ).toHaveBeenCalledTimes(1)
      expect(
        mockSupabaseClient.from("silo_config_transactions").update,
      ).toHaveBeenCalledWith({
        status: "SUCCESSFUL",
      })

      expect(mockSupabaseClient.from("silos").update).toHaveBeenCalledTimes(1)
      expect(mockSupabaseClient.from("silos").update).toHaveBeenCalledWith({
        is_make_txs_public: false,
      })

      expect(res.body).toEqual({
        action: "MAKE_TRANSACTION",
        status: "SUCCESSFUL",
        isEnabled: true,
      })
    })
  })
})
