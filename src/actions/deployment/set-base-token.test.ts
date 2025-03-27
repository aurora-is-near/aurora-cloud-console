import { contractChangerApiClient } from "@/utils/contract-changer-api/contract-changer-api-client"
import { setBaseToken } from "@/actions/deployment/set-base-token"
import { createMockSilo } from "../../../test-utils/factories/silo-factory"
import {
  createSelect,
  mockSupabaseClient,
} from "../../../test-utils/mock-supabase-client"

jest.mock("@/utils/contract-changer-api/contract-changer-api-client", () => ({
  contractChangerApiClient: {
    setBaseToken: jest.fn(() => ({ tx_hash: "mock_tx_hash" })),
    makeStorageDeposit: jest.fn(() => ({
      tx_hash: "mock_storage_deposit_tx_hash",
    })),
  },
}))

const mockTxStatus = jest.fn()

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

describe("setBaseToken", () => {
  beforeEach(() => {
    mockSupabaseClient
      .from("silo_config_transactions")
      .select.mockReturnValue(createSelect([]))
  })

  it("performs the transaction to set a base token", async () => {
    const result = await setBaseToken(mockSilo)
    const baseTokenAccountId =
      "aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near"

    expect(contractChangerApiClient.setBaseToken).toHaveBeenCalledTimes(1)
    expect(contractChangerApiClient.setBaseToken).toHaveBeenCalledWith({
      siloEngineAccountId: mockSilo.engine_account,
      baseTokenAccountId,
    })

    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).toHaveBeenCalledTimes(1)

    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).toHaveBeenCalledWith({
      target: baseTokenAccountId,
      silo_id: mockSilo.id,
      operation: "SET_BASE_TOKEN",
      status: "PENDING",
      transaction_hash: "mock_tx_hash",
    })

    expect(result).toBe("PENDING")
  })

  it("throws if the base token is invalid", async () => {
    const invalidMockSilo = createMockSilo({ base_token_symbol: "INVALID" })

    await expect(setBaseToken(invalidMockSilo)).rejects.toThrow(
      "Invalid base token symbol: INVALID",
    )
  })

  it("returns early if the base token is ETH", async () => {
    const ethMockSilo = createMockSilo({
      base_token_symbol: "ETH",
    })

    const result = await setBaseToken(ethMockSilo)

    expect(contractChangerApiClient.setBaseToken).not.toHaveBeenCalled()
    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).not.toHaveBeenCalled()

    expect(result).toBe("SUCCESSFUL")
  })

  it("handles a SUCCESSFUL transaction", async () => {
    mockSupabaseClient
      .from("silo_config_transactions")
      .select.mockReturnValue(
        createSelect([{ operation: "SET_BASE_TOKEN", status: "SUCCESSFUL" }]),
      )

    const result = await setBaseToken(mockSilo)

    expect(contractChangerApiClient.setBaseToken).not.toHaveBeenCalled()
    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).not.toHaveBeenCalled()
    expect(mockTxStatus).not.toHaveBeenCalled()
    expect(
      mockSupabaseClient.from("silo_config_transactions").update,
    ).not.toHaveBeenCalled()

    expect(result).toBe("SUCCESSFUL")
  })

  it("handles a FAILED transaction", async () => {
    mockSupabaseClient
      .from("silo_config_transactions")
      .select.mockReturnValue(
        createSelect([{ operation: "SET_BASE_TOKEN", status: "FAILED" }]),
      )

    const result = await setBaseToken(mockSilo)

    expect(contractChangerApiClient.setBaseToken).toHaveBeenCalledTimes(1)
    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).toHaveBeenCalledTimes(1)
    expect(mockTxStatus).not.toHaveBeenCalled()
    expect(
      mockSupabaseClient.from("silo_config_transactions").update,
    ).not.toHaveBeenCalled()

    expect(result).toBe("PENDING")
  })

  it("handles a PENDING transaction that is still pending", async () => {
    const mockTxHash = "mock_tx_hash"

    mockTxStatus.mockResolvedValue({ status: "NotStarted" })

    mockSupabaseClient.from("silo_config_transactions").select.mockReturnValue(
      createSelect([
        {
          operation: "SET_BASE_TOKEN",
          status: "PENDING",
          transaction_hash: mockTxHash,
        },
      ]),
    )

    const result = await setBaseToken(mockSilo)

    expect(contractChangerApiClient.setBaseToken).not.toHaveBeenCalled()
    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).not.toHaveBeenCalled()

    expect(mockTxStatus).toHaveBeenCalledTimes(1)
    expect(mockTxStatus).toHaveBeenCalledWith(
      "mock_tx_hash",
      mockSilo.engine_account,
      "FINAL",
    )

    expect(
      mockSupabaseClient.from("silo_config_transactions").update,
    ).not.toHaveBeenCalled()

    expect(result).toBe("PENDING")
  })

  it("handles a PENDING transaction that has since been successful", async () => {
    const mockTxHash = "mock_tx_hash"

    mockTxStatus.mockResolvedValue({ status: { SuccessValue: "" } })

    mockSupabaseClient.from("silo_config_transactions").select.mockReturnValue(
      createSelect([
        {
          operation: "SET_BASE_TOKEN",
          status: "PENDING",
          transaction_hash: mockTxHash,
        },
      ]),
    )

    const result = await setBaseToken(mockSilo)

    expect(contractChangerApiClient.setBaseToken).not.toHaveBeenCalled()
    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).not.toHaveBeenCalled()

    expect(mockTxStatus).toHaveBeenCalledTimes(1)
    expect(mockTxStatus).toHaveBeenCalledWith(
      "mock_tx_hash",
      mockSilo.engine_account,
      "FINAL",
    )

    expect(
      mockSupabaseClient.from("silo_config_transactions").update,
    ).toHaveBeenCalledTimes(1)

    expect(
      mockSupabaseClient.from("silo_config_transactions").update,
    ).toHaveBeenCalledWith({
      status: "SUCCESSFUL",
    })

    expect(result).toBe("SUCCESSFUL")
  })

  it("handles a PENDING transaction that has since failed", async () => {
    const mockTxHash = "mock_tx_hash"

    mockTxStatus.mockResolvedValue({ status: { Failure: {} } })

    mockSupabaseClient.from("silo_config_transactions").select.mockReturnValue(
      createSelect([
        {
          operation: "SET_BASE_TOKEN",
          status: "PENDING",
          transaction_hash: mockTxHash,
        },
      ]),
    )

    const result = await setBaseToken(mockSilo)

    expect(contractChangerApiClient.setBaseToken).not.toHaveBeenCalled()
    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).not.toHaveBeenCalled()

    expect(mockTxStatus).toHaveBeenCalledTimes(1)
    expect(mockTxStatus).toHaveBeenCalledWith(
      "mock_tx_hash",
      mockSilo.engine_account,
      "FINAL",
    )

    expect(
      mockSupabaseClient.from("silo_config_transactions").update,
    ).toHaveBeenCalledTimes(1)

    expect(
      mockSupabaseClient.from("silo_config_transactions").update,
    ).toHaveBeenCalledWith({
      status: "FAILED",
    })

    expect(result).toBe("FAILED")
  })
})
