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
  },
}))

const mockSilo = createMockSilo({ base_token_symbol: "AURORA" })

describe("setBaseToken", () => {
  beforeEach(() => {
    mockSupabaseClient
      .from("silo_config_transactions")
      .select.mockReturnValue(createSelect([]))
  })

  it("sets a base token", async () => {
    await setBaseToken(mockSilo)

    expect(contractChangerApiClient.setBaseToken).toHaveBeenCalledTimes(1)
    expect(contractChangerApiClient.setBaseToken).toHaveBeenCalledWith({
      siloEngineAccountId: mockSilo.engine_account,
      baseTokenAccountId:
        "aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near",
    })

    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).toHaveBeenCalledTimes(1)

    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).toHaveBeenCalledWith({
      silo_id: mockSilo.id,
      operation: "SET_BASE_TOKEN",
      status: "PENDING",
      transaction_hash: "mock_tx_hash",
    })
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

    await setBaseToken(ethMockSilo)

    expect(contractChangerApiClient.setBaseToken).not.toHaveBeenCalled()
    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).not.toHaveBeenCalled()
  })

  it.each(["PENDING", "SUCCESSFUL"])(
    "returns early if there is a %s transaction",
    async (status) => {
      mockSupabaseClient
        .from("silo_config_transactions")
        .select.mockReturnValue(
          createSelect([{ operation: "SET_BASE_TOKEN", status }]),
        )

      await setBaseToken(mockSilo)

      expect(contractChangerApiClient.setBaseToken).not.toHaveBeenCalled()
      expect(
        mockSupabaseClient.from("silo_config_transactions").insert,
      ).not.toHaveBeenCalled()
    },
  )

  it("does not return early if there is a FAILED transaction", async () => {
    mockSupabaseClient
      .from("silo_config_transactions")
      .select.mockReturnValue(
        createSelect([{ operation: "SET_BASE_TOKEN", status: "FAILED" }]),
      )

    await setBaseToken(mockSilo)

    expect(contractChangerApiClient.setBaseToken).toHaveBeenCalledTimes(1)
    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).toHaveBeenCalledTimes(1)
  })
})
