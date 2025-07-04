import { ethers } from "ethers"
import { symbol } from "zod"
import { contractChangerApiClient } from "@/utils/contract-changer-api/contract-changer-api-client"
import { deployDefaultTokens } from "@/actions/deployment/deploy-default-tokens"
import { createMockSilo } from "../../../test-utils/factories/silo-factory"
import {
  createSelect,
  mockSupabaseClient,
} from "../../../test-utils/mock-supabase-client"

jest.mock("ethers")
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

const mockTxStatus = jest.fn()

jest.mock("near-api-js", () => ({
  ...jest.requireActual("near-api-js"),
  Account: jest.fn(() => ({
    getAccountBalance: jest.fn(() => ({
      total: "33137693971864085399999999",
      available: "18370803971864085399999999",
      staked: "0",
    })),
    viewFunction: jest.fn(() => null),
  })),
  connect: jest.fn(() => ({
    connection: {
      provider: {
        txStatus: mockTxStatus,
      },
    },
  })),
}))

const mockSilo = createMockSilo({ base_token_symbol: "AURORA" })
const contractChangerTokens = [
  "Near",
  "Aurora",
  "Usdt",
  "Usdc",
  {
    source_contract_id: "0x4e454160.c.aurora",
    nep141: "eth.bridge.near",
  },
]

const nonBaseTokens = contractChangerTokens.filter(
  (token) => token !== "Aurora",
)

describe("deployDefaultTokens", () => {
  beforeEach(() => {
    mockSupabaseClient
      .from("silo_config_transactions")
      .select.mockReturnValue(createSelect([]))
    ;(ethers.Contract as jest.Mock).mockImplementation(() => ({
      symbol: () => {
        throw new Error("Not implemented")
      },
    }))
  })

  it("performs the transactions to deploy the tokens", async () => {
    const result = await deployDefaultTokens(mockSilo)

    expect(contractChangerApiClient.mirrorErc20Token).toHaveBeenCalledTimes(
      nonBaseTokens.length,
    )

    nonBaseTokens.forEach((token) => {
      expect(contractChangerApiClient.mirrorErc20Token).toHaveBeenCalledWith({
        siloEngineAccountId: mockSilo.engine_account,
        token,
      })
    })

    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).toHaveBeenCalledTimes(7)

    expect(
      mockSupabaseClient.from("silo_config_transactions").insert.mock.calls,
    ).toMatchSnapshot()

    expect(result).toBe("PENDING")
  })

  it("skips if all transactions were already SUCCESSFUL", async () => {
    mockSupabaseClient
      .from("silo_config_transactions")
      .select.mockReturnValue(createSelect([{ status: "SUCCESSFUL" }]))

    const result = await deployDefaultTokens(mockSilo)

    expect(contractChangerApiClient.mirrorErc20Token).not.toHaveBeenCalled()
    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).not.toHaveBeenCalled()
    expect(mockTxStatus).not.toHaveBeenCalled()
    expect(
      mockSupabaseClient.from("silo_config_transactions").update,
    ).not.toHaveBeenCalled()

    expect(result).toBe("SUCCESSFUL")
  })

  it("skips a single token with an already SUCCESSFUL transaction", async () => {
    mockSupabaseClient
      .from("silo_config_transactions")
      .select.mockReturnValueOnce(createSelect([{ status: "SUCCESSFUL" }]))

    const result = await deployDefaultTokens(mockSilo)

    expect(contractChangerApiClient.mirrorErc20Token).toHaveBeenCalledTimes(
      nonBaseTokens.length - 1,
    )

    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).toHaveBeenCalledTimes((nonBaseTokens.length - 1) * 2)

    expect(
      mockSupabaseClient.from("silo_config_transactions").insert.mock.calls,
    ).toMatchSnapshot()

    expect(mockTxStatus).not.toHaveBeenCalled()
    expect(
      mockSupabaseClient.from("silo_config_transactions").update,
    ).not.toHaveBeenCalled()

    expect(result).toBe("PENDING")
  })

  it("skips if a token contract was already deployed", async () => {
    ;(ethers.Contract as jest.Mock).mockImplementation(
      (tokenContractAddress) => ({
        symbol: () => {
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

    const result = await deployDefaultTokens(mockSilo)

    expect(contractChangerApiClient.mirrorErc20Token).toHaveBeenCalledTimes(3)
    expect(contractChangerApiClient.mirrorErc20Token).toHaveBeenCalledWith({
      siloEngineAccountId: mockSilo.engine_account,
      token: "Near",
    })

    expect(contractChangerApiClient.mirrorErc20Token).toHaveBeenCalledWith({
      siloEngineAccountId: mockSilo.engine_account,
      token: "Usdc",
    })

    expect(contractChangerApiClient.mirrorErc20Token).toHaveBeenCalledWith({
      siloEngineAccountId: mockSilo.engine_account,
      token: {
        source_contract_id: "0x4e454160.c.aurora",
        nep141: "eth.bridge.near",
      },
    })

    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).toHaveBeenCalledTimes(6)

    expect(
      mockSupabaseClient.from("silo_config_transactions").insert.mock.calls,
    ).toMatchSnapshot()

    expect(mockTxStatus).not.toHaveBeenCalled()
    expect(
      mockSupabaseClient.from("silo_config_transactions").update,
    ).not.toHaveBeenCalled()

    expect(result).toBe("PENDING")
  })

  it("handles FAILED transactions", async () => {
    mockSupabaseClient
      .from("silo_config_transactions")
      .select.mockReturnValue(createSelect([{ status: "FAILED" }]))

    const result = await deployDefaultTokens(mockSilo)

    expect(contractChangerApiClient.mirrorErc20Token).toHaveBeenCalledTimes(
      nonBaseTokens.length,
    )

    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).toHaveBeenCalledTimes(7)

    expect(
      mockSupabaseClient.from("silo_config_transactions").insert.mock.calls,
    ).toMatchSnapshot()

    expect(mockTxStatus).not.toHaveBeenCalled()
    expect(
      mockSupabaseClient.from("silo_config_transactions").update,
    ).not.toHaveBeenCalled()

    expect(result).toBe("PENDING")
  })

  it("handles transactions that are still PENDING", async () => {
    let calls = 0

    mockTxStatus.mockResolvedValue({ status: "NotStarted" })

    mockSupabaseClient
      .from("silo_config_transactions")
      .select.mockImplementation(() => {
        calls += 1

        return createSelect([
          {
            status: "PENDING",
            transaction_hash: `mock_tx_hash_${calls}`,
          },
        ])
      })

    const result = await deployDefaultTokens(mockSilo)

    expect(contractChangerApiClient.mirrorErc20Token).not.toHaveBeenCalled()
    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).not.toHaveBeenCalled()

    expect(mockTxStatus).toHaveBeenCalledTimes(7)

    Array.from({ length: nonBaseTokens.length }).forEach((_, i) => {
      expect(mockTxStatus).toHaveBeenNthCalledWith(
        i + 1,
        `mock_tx_hash_${i + 1}`,
        mockSilo.engine_account,
        "FINAL",
      )
    })

    expect(
      mockSupabaseClient.from("silo_config_transactions").update,
    ).not.toHaveBeenCalled()

    expect(result).toBe("PENDING")
  })

  it("handles PENDING transactions that has since been successful", async () => {
    let calls = 0

    mockTxStatus.mockResolvedValue({ status: { SuccessValue: "" } })

    mockSupabaseClient
      .from("silo_config_transactions")
      .select.mockImplementation(() => {
        calls += 1

        return createSelect([
          {
            status: "PENDING",
            transaction_hash: `mock_tx_hash_${calls}`,
          },
        ])
      })

    const result = await deployDefaultTokens(mockSilo)

    expect(contractChangerApiClient.mirrorErc20Token).not.toHaveBeenCalled()
    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).not.toHaveBeenCalled()

    expect(mockTxStatus).toHaveBeenCalledTimes(7)

    Array.from({ length: nonBaseTokens.length }).forEach((_, i) => {
      expect(mockTxStatus).toHaveBeenNthCalledWith(
        i + 1,
        `mock_tx_hash_${i + 1}`,
        mockSilo.engine_account,
        "FINAL",
      )
    })

    expect(
      mockSupabaseClient.from("silo_config_transactions").update,
    ).toHaveBeenCalledTimes(7)

    Array.from({ length: nonBaseTokens.length }).forEach((_, i) => {
      expect(
        mockSupabaseClient.from("silo_config_transactions").update,
      ).toHaveBeenNthCalledWith(i + 1, { status: "SUCCESSFUL" })
    })

    expect(result).toBe("SUCCESSFUL")
  })

  it("handles PENDING transactions that have since failed", async () => {
    let calls = 0

    mockTxStatus.mockResolvedValue({ status: { Failure: {} } })

    mockSupabaseClient
      .from("silo_config_transactions")
      .select.mockImplementation(() => {
        calls += 1

        return createSelect([
          {
            status: "PENDING",
            transaction_hash: `mock_tx_hash_${calls}`,
          },
        ])
      })

    const result = await deployDefaultTokens(mockSilo)

    expect(contractChangerApiClient.mirrorErc20Token).not.toHaveBeenCalled()
    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).not.toHaveBeenCalled()

    expect(mockTxStatus).toHaveBeenCalledTimes(7)

    Array.from({ length: nonBaseTokens.length }).forEach((_, i) => {
      expect(mockTxStatus).toHaveBeenNthCalledWith(
        i + 1,
        `mock_tx_hash_${i + 1}`,
        mockSilo.engine_account,
        "FINAL",
      )
    })

    expect(
      mockSupabaseClient.from("silo_config_transactions").update,
    ).toHaveBeenCalledTimes(7)

    Array.from({ length: nonBaseTokens.length }).forEach((_, i) => {
      expect(
        mockSupabaseClient.from("silo_config_transactions").update,
      ).toHaveBeenNthCalledWith(i + 1, { status: "FAILED" })
    })

    expect(result).toBe("FAILED")
  })
})
