/**
 * @jest-environment node
 */
import { NextRequest } from "next/server"
import { ethers } from "ethers"
import { contractChangerApiClient } from "@/utils/contract-changer-api/contract-changer-api-client"
import { POST } from "./route"
import {
  createInsertOrUpdate,
  createSelect,
  mockSupabaseClient,
} from "../../../../../test-utils/mock-supabase-client"
import {
  createMockSilo,
  createMockSilos,
} from "../../../../../test-utils/factories/silo-factory"

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
  },
}))

describe("Silos repair route", () => {
  beforeEach(() => {
    mockSupabaseClient.from("silos").select.mockReturnValue(createSelect([]))
    mockSupabaseClient
      .from("silo_config_transactions")
      .select.mockReturnValue(createSelect([]))
    ;(ethers.Contract as jest.Mock).mockImplementation(() => ({
      symbol: () => {
        throw new Error("Not implemented")
      },
    }))
  })

  it("repairs all silos", async () => {
    const oneHourAgo = new Date(currentTime.getTime() - 60 * 60 * 1000)

    const mockSilos = createMockSilos(2, {
      is_active: false,
      inspected_at: oneHourAgo.toISOString(),
    })

    mockSilos[0].base_token_symbol = "AURORA"

    mockSupabaseClient
      .from("silos")
      .select.mockReturnValue(createSelect(mockSilos))
    mockSupabaseClient
      .from("silos")
      .update.mockReturnValue(createInsertOrUpdate({}))
    ;(ethers.Contract as jest.Mock).mockImplementation(
      (tokenContractAddress) => ({
        symbol: () => {
          if (
            tokenContractAddress ===
            "0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d"
          ) {
            throw new Error("Not implemented")
          }
        },
      }),
    )

    const req = new NextRequest("https://example.com", { method: "POST" })
    const res = await POST(req, { params: {} })

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      status: 200,
      body: {
        message: "ok",
      },
    })

    expect(ethers.Contract).toHaveBeenCalledTimes(7)
    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).toHaveBeenCalledTimes(3)

    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).toHaveBeenCalledWith({
      operation: "DEPLOY_NEAR",
      silo_id: mockSilos[0].id,
      status: "PENDING",
      transaction_hash: "mock_tx_hash_Near",
    })

    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).toHaveBeenCalledWith({
      operation: "DEPLOY_NEAR",
      silo_id: mockSilos[1].id,
      status: "PENDING",
      transaction_hash: "mock_tx_hash_Near",
    })

    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).toHaveBeenCalledWith({
      operation: "SET_BASE_TOKEN",
      silo_id: mockSilos[0].id,
      status: "PENDING",
      transaction_hash: "mock_set_base_token_tx_hash",
    })

    expect(contractChangerApiClient.mirrorErc20Token).toHaveBeenCalledTimes(2)
    expect(contractChangerApiClient.mirrorErc20Token).toHaveBeenNthCalledWith(
      1,
      {
        siloEngineAccountId: mockSilos[0].engine_account,
        token: "Near",
      },
    )

    expect(contractChangerApiClient.mirrorErc20Token).toHaveBeenNthCalledWith(
      2,
      {
        siloEngineAccountId: mockSilos[1].engine_account,
        token: "Near",
      },
    )

    expect(contractChangerApiClient.setBaseToken).toHaveBeenCalledTimes(1)
    expect(contractChangerApiClient.setBaseToken).toHaveBeenCalledWith({
      baseTokenAccountId:
        "aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near",
      siloEngineAccountId: mockSilos[0].engine_account,
    })

    expect(mockSupabaseClient.from("silos").update).toHaveBeenCalledTimes(2)
    expect(mockSupabaseClient.from("silos").update).toHaveBeenCalledWith({
      inspected_at: currentTime.toISOString(),
    })
  })

  it("defers repair of a silo that has never been inspected", async () => {
    const mockSilo = createMockSilo({
      is_active: false,
      base_token_symbol: "AURORA",
      inspected_at: null,
    })

    const silosUpdateQueries = createInsertOrUpdate(mockSilo)

    mockSupabaseClient
      .from("silos")
      .select.mockReturnValue(createSelect([mockSilo]))
    mockSupabaseClient.from("silos").update.mockReturnValue(silosUpdateQueries)

    const req = new NextRequest("https://example.com", { method: "POST" })
    const res = await POST(req, { params: {} })

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      status: 200,
      body: {
        message: "ok",
      },
    })

    expect(contractChangerApiClient.mirrorErc20Token).not.toHaveBeenCalled()
    expect(contractChangerApiClient.setBaseToken).not.toHaveBeenCalled()
    expect(ethers.Contract).not.toHaveBeenCalled()
    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).not.toHaveBeenCalled()

    expect(mockSupabaseClient.from("silos").update).toHaveBeenCalledTimes(1)
    expect(silosUpdateQueries.eq).toHaveBeenCalledWith("id", mockSilo.id)
    expect(mockSupabaseClient.from("silos").update).toHaveBeenCalledWith({
      inspected_at: currentTime.toISOString(),
    })
  })

  it("does not perform update transactions if the last transaction failed and the inspection was within 24 hours", async () => {
    const oneDayAgo = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000)

    const mockSilo = createMockSilo({
      is_active: false,
      base_token_symbol: "AURORA",
      inspected_at: new Date(oneDayAgo.getTime() + 1).toISOString(),
    })

    const silosUpdateQueries = createInsertOrUpdate(mockSilo)

    mockSupabaseClient
      .from("silos")
      .select.mockReturnValue(createSelect([mockSilo]))
    mockSupabaseClient.from("silos").update.mockReturnValue(silosUpdateQueries)
    mockSupabaseClient
      .from("silo_config_transactions")
      .select.mockReturnValue(createSelect([{ status: "FAILED" }]))

    const req = new NextRequest("https://example.com", { method: "POST" })
    const res = await POST(req, { params: {} })

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      status: 200,
      body: {
        message: "ok",
      },
    })

    expect(contractChangerApiClient.mirrorErc20Token).not.toHaveBeenCalled()
    expect(contractChangerApiClient.setBaseToken).not.toHaveBeenCalled()
    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).not.toHaveBeenCalled()

    expect(mockSupabaseClient.from("silos").update).toHaveBeenCalledTimes(1)
    expect(silosUpdateQueries.eq).toHaveBeenCalledWith("id", mockSilo.id)
    expect(mockSupabaseClient.from("silos").update).toHaveBeenCalledWith({
      inspected_at: currentTime.toISOString(),
    })
  })

  it("marks a silo as active if all transactions were completed", async () => {
    const oneHourAgo = new Date(currentTime.getTime() - 60 * 60 * 1000)

    const mockSilo = createMockSilo({
      is_active: false,
      base_token_symbol: "AURORA",
      inspected_at: oneHourAgo.toISOString(),
    })

    const silosUpdateQueries = createInsertOrUpdate(mockSilo)

    mockSupabaseClient
      .from("silos")
      .select.mockReturnValue(createSelect([mockSilo]))
    mockSupabaseClient.from("silos").update.mockReturnValue(silosUpdateQueries)
    mockSupabaseClient
      .from("silo_config_transactions")
      .select.mockReturnValue(createSelect([{ status: "SUCCESSFUL" }]))

    const req = new NextRequest("https://example.com", { method: "POST" })
    const res = await POST(req, { params: {} })

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      status: 200,
      body: {
        message: "ok",
      },
    })

    expect(mockSupabaseClient.from("silos").update).toHaveBeenCalledTimes(1)
    expect(silosUpdateQueries.eq).toHaveBeenCalledWith("id", mockSilo.id)
    expect(mockSupabaseClient.from("silos").update).toHaveBeenCalledWith({
      is_active: true,
      inspected_at: currentTime.toISOString(),
    })
  })
})
