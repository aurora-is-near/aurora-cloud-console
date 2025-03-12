/**
 * @jest-environment node
 */
import { contractChangerApiClient } from "@/utils/contract-changer-api/contract-changer-api-client"
import type { SiloWhitelistAddress } from "@/types/types"

import {
  createSelect,
  createInsertOrUpdate,
  mockSupabaseClient,
} from "../../../../../../test-utils/mock-supabase-client"
import { setupJestOpenApi } from "../../../../../../test-utils/setup-jest-openapi"
import { invokeApiHandler } from "../../../../../../test-utils/invoke-api-handler"
import { createMockSilo } from "../../../../../../test-utils/factories/silo-factory"

import { POST } from "./route"

const mockTxStatus = jest.fn()

jest.mock("../../../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

jest.mock("@/utils/contract-changer-api/contract-changer-api-client", () => ({
  contractChangerApiClient: {
    addAddressToWhitelist: jest.fn(() => ({ tx_hash: "mock_tx_hash" })),
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

const mockWhitelistAddress = (args: Partial<SiloWhitelistAddress> = {}) => ({
  id: 1,
  address: "0x00",
  is_applied: false,
  list: "POPULATE_MAKE_TXS_WHITELIST",
  silo_id: 1,
  add_tx_id: 1,
  remove_tx_id: 1,
  ...args,
})

const mockPopulateTx = createInsertOrUpdate({
  id: 1,
  silo_id: 1,
  operation: "POPULATE_MAKE_TXS_WHITELIST",
  status: "PENDING",
  transaction_hash: "mock_tx_hash",
})

const createMockWhitelistAddressInsert = (
  args: Partial<SiloWhitelistAddress> = {},
) => createInsertOrUpdate(mockWhitelistAddress(args))

const createMockWhitelistAddress = (args: Partial<SiloWhitelistAddress> = {}) =>
  createSelect(mockWhitelistAddress(args))

describe("No silo", () => {
  beforeAll(setupJestOpenApi)

  it("[POST] returns 404 if silo not found", async () => {
    const res = await invokeApiHandler(
      "POST",
      "/api/silos/1/permissions",
      POST,
      {
        params: { id: "1" },
        body: { address: "0x00", action: "MAKE_TRANSACTION" },
      },
    )
    expect(res.status).toBe(404)
  })
})

describe("Silo whitelist permissions", () => {
  beforeAll(setupJestOpenApi)

  describe("Adds an address to the whitelist", () => {
    beforeEach(() => {
      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))

      mockSupabaseClient
        .from("silo_config_transactions")
        .insert.mockReturnValue(mockPopulateTx)

      mockSupabaseClient
        .from("silo_whitelist_addresses")
        .insert.mockReturnValue(createMockWhitelistAddressInsert())
    })

    it("returns 400 if action parameter is not passed", async () => {
      const res = await invokeApiHandler(
        "POST",
        "/api/silos/1/permissions",
        POST,
        {
          params: { id: "1" },
          body: { address: "0x00" },
        },
      )

      expect(res.status).toBe(400)
      expect(res.body).toEqual({
        message: "Missing action value in request (action must be provided)",
      })
    })

    it("returns 400 if address parameter is not passed", async () => {
      const res = await invokeApiHandler(
        "POST",
        "/api/silos/1/permissions",
        POST,
        {
          params: { id: "1" },
          body: { action: "MAKE_TRANSACTION" },
        },
      )

      expect(res.status).toBe(400)
      expect(res.body).toEqual({
        message: "Missing address value in request (address must be provided)",
      })
    })

    it("returns success if address is already in whitelist", async () => {
      mockSupabaseClient
        .from("silo_whitelist_addresses")
        .select.mockImplementationOnce(() =>
          createSelect({
            id: 1,
            address: "0x00",
            is_applied: true,
            silo_id: 1,
            list: "MAKE_TRANSACTION",
            add_tx_id: 1,
            remove_tx_id: null,
          }),
        )

      const res = await invokeApiHandler(
        "POST",
        "/api/silos/1/permissions",
        POST,
        {
          params: { id: "1" },
          body: { address: "0x00", action: "MAKE_TRANSACTION" },
        },
      )

      expect(
        contractChangerApiClient.addAddressToWhitelist,
      ).not.toHaveBeenCalled()

      expect(res.body).toEqual({
        action: "MAKE_TRANSACTION",
        status: "SUCCESSFUL",
        address: "0x00",
      })
    })

    it("creates new tx if it doesn't exist", async () => {
      mockSupabaseClient
        .from("silo_config_transactions")
        .select.mockImplementation(() => createSelect(null))

      const res = await invokeApiHandler(
        "POST",
        "/api/silos/1/permissions",
        POST,
        {
          params: { id: "1" },
          body: { address: "0x00", action: "MAKE_TRANSACTION" },
        },
      )

      expect(
        contractChangerApiClient.addAddressToWhitelist,
      ).toHaveBeenCalledTimes(1)
      expect(
        contractChangerApiClient.addAddressToWhitelist,
      ).toHaveBeenCalledWith({
        siloEngineAccountId: mockSilo.engine_account,
        addr: "0x00",
        whitelistKind: "address",
      })

      expect(
        mockSupabaseClient.from("silo_config_transactions").insert,
      ).toHaveBeenCalledTimes(1)

      expect(
        mockSupabaseClient.from("silo_config_transactions").insert,
      ).toHaveBeenCalledWith({
        silo_id: mockSilo.id,
        operation: "POPULATE_MAKE_TXS_WHITELIST",
        status: "PENDING",
        transaction_hash: "mock_tx_hash",
      })

      expect(res.body).toEqual({
        action: "MAKE_TRANSACTION",
        status: "PENDING",
        address: "0x00",
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
        "POST",
        "/api/silos/1/permissions",
        POST,
        {
          params: { id: "1" },
          body: { address: "0x00", action: "MAKE_TRANSACTION" },
        },
      )

      expect(
        contractChangerApiClient.addAddressToWhitelist,
      ).toHaveBeenCalledTimes(1)
      expect(
        contractChangerApiClient.addAddressToWhitelist,
      ).toHaveBeenCalledWith({
        siloEngineAccountId: mockSilo.engine_account,
        addr: "0x00",
        whitelistKind: "address",
      })

      expect(
        mockSupabaseClient.from("silo_config_transactions").insert,
      ).toHaveBeenCalledTimes(1)

      expect(
        mockSupabaseClient.from("silo_config_transactions").insert,
      ).toHaveBeenCalledWith({
        silo_id: mockSilo.id,
        operation: "POPULATE_MAKE_TXS_WHITELIST",
        status: "PENDING",
        transaction_hash: "mock_tx_hash",
      })

      expect(res.body).toEqual({
        action: "MAKE_TRANSACTION",
        status: "PENDING",
        address: "0x00",
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
        "POST",
        "/api/silos/1/permissions",
        POST,
        {
          params: { id: "1" },
          body: { address: "0x00", action: "MAKE_TRANSACTION" },
        },
      )

      expect(
        contractChangerApiClient.addAddressToWhitelist,
      ).toHaveBeenCalledTimes(1)
      expect(
        contractChangerApiClient.addAddressToWhitelist,
      ).toHaveBeenCalledWith({
        siloEngineAccountId: mockSilo.engine_account,
        addr: "0x00",
        whitelistKind: "address",
      })

      expect(
        mockSupabaseClient.from("silo_config_transactions").insert,
      ).toHaveBeenCalledTimes(1)

      expect(
        mockSupabaseClient.from("silo_config_transactions").insert,
      ).toHaveBeenCalledWith({
        silo_id: mockSilo.id,
        operation: "POPULATE_MAKE_TXS_WHITELIST",
        status: "PENDING",
        transaction_hash: "mock_tx_hash",
      })

      expect(res.body).toEqual({
        action: "MAKE_TRANSACTION",
        status: "PENDING",
        address: "0x00",
      })
    })

    it("check tx status if previous one is pending (and still pending)", async () => {
      mockSupabaseClient
        .from("silo_config_transactions")
        .select.mockImplementationOnce(() =>
          createSelect({
            status: "PENDING",
          }),
        )

      mockSupabaseClient
        .from("silo_whitelist_addresses")
        .select.mockImplementation(() => createMockWhitelistAddress())

      mockTxStatus.mockResolvedValueOnce({ status: "NotStarted" })

      const res = await invokeApiHandler(
        "POST",
        "/api/silos/1/permissions",
        POST,
        {
          params: { id: "1" },
          body: { address: "0x00", action: "MAKE_TRANSACTION" },
        },
      )

      expect(
        contractChangerApiClient.addAddressToWhitelist,
      ).not.toHaveBeenCalled()
      expect(
        mockSupabaseClient.from("silo_config_transactions").insert,
      ).not.toHaveBeenCalled()

      expect(mockSupabaseClient.from("silos").update).not.toHaveBeenCalled()
      expect(mockTxStatus).toHaveBeenCalledTimes(1)

      expect(
        mockSupabaseClient.from("silo_config_transactions").update,
      ).not.toHaveBeenCalled()

      expect(res.body).toEqual({
        action: "MAKE_TRANSACTION",
        status: "PENDING",
        address: "0x00",
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

      mockSupabaseClient
        .from("silo_whitelist_addresses")
        .select.mockImplementation(() => createMockWhitelistAddress())

      const res = await invokeApiHandler(
        "POST",
        "/api/silos/1/permissions",
        POST,
        {
          params: { id: "1" },
          body: { address: "0x00", action: "MAKE_TRANSACTION" },
        },
      )

      expect(
        contractChangerApiClient.addAddressToWhitelist,
      ).not.toHaveBeenCalled()
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
            status: "SUCCESSFUL",
            operation: "POPULATE_MAKE_TXS_WHITELIST",
            transaction_hash: "mock_tx_hash",
          }),
        )

      mockSupabaseClient
        .from("silos")
        .update.mockReturnValue(createInsertOrUpdate(mockSilo))

      mockTxStatus.mockResolvedValue({ status: { SuccessValue: "" } })

      mockSupabaseClient
        .from("silo_whitelist_addresses")
        .select.mockImplementation(() => createMockWhitelistAddress())

      mockSupabaseClient
        .from("silo_whitelist_addresses")
        .update.mockReturnValue(createMockWhitelistAddressInsert())

      const res = await invokeApiHandler(
        "POST",
        "/api/silos/1/permissions",
        POST,
        {
          params: { id: "1" },
          body: { address: "0x00", action: "MAKE_TRANSACTION" },
        },
      )

      expect(
        contractChangerApiClient.addAddressToWhitelist,
      ).not.toHaveBeenCalled()
      expect(
        mockSupabaseClient.from("silo_config_transactions").insert,
      ).not.toHaveBeenCalled()

      expect(
        mockSupabaseClient.from("silo_whitelist_addresses").update,
      ).toHaveBeenCalledTimes(1)
      expect(
        mockSupabaseClient.from("silo_whitelist_addresses").update,
      ).toHaveBeenCalledWith({
        is_applied: true,
      })

      expect(res.body).toEqual({
        action: "MAKE_TRANSACTION",
        status: "SUCCESSFUL",
        address: "0x00",
      })
    })
  })
})
