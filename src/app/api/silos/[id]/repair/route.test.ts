/**
 * @jest-environment node
 */
import { ethers } from "ethers"
import { POST } from "./route"
import {
  createInsertOrUpdate,
  createSelect,
  mockSupabaseClient,
} from "../../../../../../test-utils/mock-supabase-client"
import { createMockSilo } from "../../../../../../test-utils/factories/silo-factory"
import { invokeApiHandler } from "../../../../../../test-utils/invoke-api-handler"
import { setupJestOpenApi } from "../../../../../../test-utils/setup-jest-openapi"

const currentTime = new Date("2025-03-17T09:00:00Z")

jest.useFakeTimers()
jest.setSystemTime(currentTime)

jest.mock("ethers")
jest.mock("@/utils/contract-changer-api/contract-changer-api-client", () => ({
  contractChangerApiClient: {
    mirrorErc20Token: jest.fn(({ token }) => ({
      tx_hash: `mock_tx_hash_${token}`,
    })),
    setBaseToken: jest.fn(() => ({ tx_hash: "mock_set_base_token_tx_hash" })),
    makeStorageDeposit: jest.fn(() => ({
      tx_hash: "mock_storage_deposit_tx_hash",
    })),
  },
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

jest.mock("../../../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

describe("Silo repair route", () => {
  beforeAll(setupJestOpenApi)

  beforeEach(() => {
    mockSupabaseClient.from("silos").select.mockReturnValue(createSelect([]))
    mockSupabaseClient
      .from("silos")
      .update.mockReturnValue(createInsertOrUpdate({}))
    mockSupabaseClient
      .from("silo_config_transactions")
      .select.mockReturnValue(createSelect([]))
    mockSupabaseClient
      .from("silo_config_transactions")
      .update.mockReturnValue(createInsertOrUpdate([]))
    mockSupabaseClient
      .from("bridged_token_requests")
      .select.mockReturnValue(createSelect([]))
    mockSupabaseClient
      .from("bridged_tokens")
      .select.mockReturnValue(createSelect([]))
    mockSupabaseClient
      .from("silo_bridged_tokens")
      .select.mockReturnValue(createSelect([]))
    ;(ethers.Contract as jest.Mock).mockImplementation(() => ({
      symbol: () => {
        throw new Error("Not implemented")
      },
    }))
  })

  it("repairs a silo", async () => {
    const oneHourAgo = new Date(currentTime.getTime() - 60 * 60 * 1000)

    const mockSilo = createMockSilo({
      is_active: false,
      inspected_at: oneHourAgo.toISOString(),
      base_token_symbol: "AURORA",
    })

    mockSupabaseClient
      .from("silos")
      .select.mockReturnValue(createSelect(mockSilo))

    const res = await invokeApiHandler("POST", "/api/silos/1/repair", POST)

    expect(res.status).toBe(200)
    expect(res).toSatisfyApiSpec()
    expect(res.body).toMatchSnapshot()
  })
})
