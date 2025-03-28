import { ethers } from "ethers"
import { contractChangerApiClient } from "@/utils/contract-changer-api/contract-changer-api-client"
import { deployBridgedToken } from "@/actions/deployment/deploy-bridged-token"
import { createMockSilo } from "../../../test-utils/factories/silo-factory"
import {
  createSelect,
  mockSupabaseClient,
} from "../../../test-utils/mock-supabase-client"
import { createMockSiloBridgedToken } from "../../../test-utils/factories/silo-bridged-token-factory"

jest.mock("ethers")
jest.mock("@/utils/contract-changer-api/contract-changer-api-client", () => ({
  contractChangerApiClient: {
    mirrorErc20Token: jest.fn(() => ({
      tx_hash: "mock_mirror_token_tx_hash",
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

  it("performs the transactions to deploy the token", async () => {
    const bridgedToken = createMockSiloBridgedToken({
      aurora_address: "mock_aurora_address",
      near_address: "mock_near_address",
    })

    const result = await deployBridgedToken({ silo: mockSilo, bridgedToken })

    expect(contractChangerApiClient.mirrorErc20Token).toHaveBeenCalledTimes(1)
    expect(contractChangerApiClient.mirrorErc20Token).toHaveBeenCalledWith({
      siloEngineAccountId: mockSilo.engine_account,
      token: {
        source_contract_id: "aurora",
        nep141: bridgedToken.near_address,
      },
    })

    expect(contractChangerApiClient.makeStorageDeposit).toHaveBeenCalledTimes(1)
    expect(contractChangerApiClient.makeStorageDeposit).toHaveBeenCalledWith({
      siloEngineAccountId: mockSilo.engine_account,
      amount: "0.00125 near",
      token: bridgedToken.near_address,
    })

    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).toHaveBeenCalledTimes(2)

    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).toHaveBeenCalledWith({
      operation: "DEPLOY_TOKEN",
      silo_id: 1,
      status: "PENDING",
      target: "mock_near_address",
      transaction_hash: "mock_mirror_token_tx_hash",
    })

    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).toHaveBeenCalledWith({
      operation: "STORAGE_DEPOSIT",
      silo_id: 1,
      status: "PENDING",
      target: "mock_near_address",
      transaction_hash: "mock_storage_deposit_tx_hash",
    })

    expect(result).toBe("PENDING")
  })
})
