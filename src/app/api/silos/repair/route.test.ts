/**
 * @jest-environment node
 */
import { NextRequest } from "next/server"
import { ethers } from "ethers"
import { contractChangerApiClient } from "@/utils/contract-changer-api/contract-changer-api-client"
import { logger } from "@/logger"
import { GET } from "./route"
import {
  createInsertOrUpdate,
  createSelect,
  mockSupabaseClient,
} from "../../../../../test-utils/mock-supabase-client"
import {
  createMockSilo,
  createMockSilos,
} from "../../../../../test-utils/factories/silo-factory"
import { createMockBridgedToken } from "../../../../../test-utils/factories/bridged-token-factory"
import { createMockBridgedTokenRequest } from "../../../../../test-utils/factories/silo-bridged-token-request-factory"

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

describe("Silos repair route", () => {
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

    const req = new NextRequest("https://example.com", {
      method: "GET",
      headers: {
        "user-agent": "vercel-cron/1.0",
      },
    })

    const res = await GET(req, { params: {} })

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      status: 200,
      body: {
        message: "ok",
      },
    })

    expect(ethers.Contract).toHaveBeenCalledTimes(8)
    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).toHaveBeenCalledTimes(3)

    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).toHaveBeenCalledWith({
      target: null,
      operation: "DEPLOY_NEAR",
      silo_id: mockSilos[0].id,
      status: "PENDING",
      transaction_hash: "mock_tx_hash_Near",
    })

    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).toHaveBeenCalledWith({
      target: null,
      operation: "DEPLOY_NEAR",
      silo_id: mockSilos[1].id,
      status: "PENDING",
      transaction_hash: "mock_tx_hash_Near",
    })

    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).toHaveBeenCalledWith({
      target: "aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near",
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

    const req = new NextRequest("https://example.com", {
      method: "GET",
      headers: {
        "user-agent": "vercel-cron/1.0",
      },
    })

    const res = await GET(req, { params: {} })

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

    const req = new NextRequest("https://example.com", {
      method: "GET",
      headers: {
        "user-agent": "vercel-cron/1.0",
      },
    })

    const res = await GET(req, { params: {} })

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

    const req = new NextRequest("https://example.com", {
      method: "GET",
      headers: {
        "user-agent": "vercel-cron/1.0",
      },
    })

    const res = await GET(req, { params: {} })

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

  it("resolves pending bridged token requests", async () => {
    const mockSilo = createMockSilo({
      is_active: true,
      base_token_symbol: "AURORA",
      inspected_at: new Date(
        currentTime.getTime() - 60 * 60 * 1000,
      ).toISOString(),
    })

    const mockBridgedTokenReqeusts = [
      createMockBridgedTokenRequest({ symbol: "TESTa" }),
      createMockBridgedTokenRequest({ symbol: "TESTb" }),
      createMockBridgedTokenRequest({ symbol: "TESTc" }),
    ]

    const mockBridgedTokens = [
      {
        ...createMockBridgedToken({ symbol: "TESTa", silo_address: "0x123" }),
        silo_bridged_tokens: [],
      },
      {
        ...createMockBridgedToken({ symbol: "TESTb", silo_address: "0x456" }),
        silo_bridged_tokens: [],
      },
    ]

    mockSupabaseClient
      .from("silos")
      .select.mockReturnValue(createSelect([mockSilo]))
    mockSupabaseClient
      .from("bridged_token_requests")
      .select.mockReturnValue(createSelect(mockBridgedTokenReqeusts))
    mockSupabaseClient
      .from("bridged_tokens")
      .select.mockReturnValue(createSelect(mockBridgedTokens))
    ;(ethers.Contract as jest.Mock).mockImplementation(
      (tokenContractAddress) => ({
        symbol: () => {
          if (tokenContractAddress !== mockBridgedTokens[0].silo_address) {
            throw new Error("Not implemented")
          }
        },
      }),
    )

    const req = new NextRequest("https://example.com", {
      method: "GET",
      headers: {
        "user-agent": "vercel-cron/1.0",
      },
    })

    const res = await GET(req, { params: {} })

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      status: 200,
      body: {
        message: "ok",
      },
    })

    expect(
      mockSupabaseClient.from("silo_bridged_tokens").upsert,
    ).toHaveBeenCalledTimes(2)
    expect(
      mockSupabaseClient.from("silo_bridged_tokens").upsert,
    ).toHaveBeenCalledWith([
      {
        bridged_token_id: mockBridgedTokenReqeusts[0].id,
        is_deployment_pending: true,
        silo_id: mockSilo.id,
      },
    ])
    expect(
      mockSupabaseClient.from("silo_bridged_tokens").upsert,
    ).toHaveBeenCalledWith([
      {
        bridged_token_id: mockBridgedTokenReqeusts[1].id,
        is_deployment_pending: false,
        silo_id: mockSilo.id,
      },
    ])
  })

  it("resolves pending bridged tokens", async () => {
    const mockSilo = createMockSilo({
      is_active: true,
      base_token_symbol: "AURORA",
      inspected_at: new Date(
        currentTime.getTime() - 60 * 60 * 1000,
      ).toISOString(),
    })

    const mockBridgedTokens = [
      {
        ...createMockBridgedToken({ symbol: "TESTa", silo_address: "0x123" }),
        silo_bridged_tokens: [
          { silo_id: mockSilo.id, is_deployment_pending: true },
        ],
      },
      {
        ...createMockBridgedToken({ symbol: "TESTb", silo_address: "0x456" }),
        silo_bridged_tokens: [
          { silo_id: mockSilo.id, is_deployment_pending: true },
        ],
      },
    ]

    const silosBridgedTokensUpdateQueries = createInsertOrUpdate({})

    mockSupabaseClient
      .from("silos")
      .select.mockReturnValue(createSelect([mockSilo]))
    mockSupabaseClient
      .from("bridged_token_requests")
      .select.mockReturnValue(createSelect([]))
    mockSupabaseClient
      .from("bridged_tokens")
      .select.mockReturnValue(createSelect(mockBridgedTokens))
    mockSupabaseClient
      .from("silo_bridged_tokens")
      .update.mockReturnValue(silosBridgedTokensUpdateQueries)
    ;(ethers.Contract as jest.Mock).mockImplementation(
      (tokenContractAddress) => ({
        symbol: () => {
          if (tokenContractAddress !== mockBridgedTokens[0].silo_address) {
            throw new Error("Not implemented")
          }
        },
      }),
    )

    const req = new NextRequest("https://example.com", {
      method: "GET",
      headers: {
        "user-agent": "vercel-cron/1.0",
      },
    })

    const res = await GET(req, { params: {} })

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      status: 200,
      body: {
        message: "ok",
      },
    })

    expect(
      mockSupabaseClient.from("silo_bridged_tokens").update,
    ).toHaveBeenCalledTimes(2)

    expect(silosBridgedTokensUpdateQueries.eq).toHaveBeenCalledWith(
      "silo_id",
      mockSilo.id,
    )

    expect(silosBridgedTokensUpdateQueries.eq).toHaveBeenCalledWith(
      "bridged_token_id",
      mockBridgedTokens[0].id,
    )

    expect(silosBridgedTokensUpdateQueries.eq).toHaveBeenCalledWith(
      "bridged_token_id",
      mockBridgedTokens[1].id,
    )

    expect(
      mockSupabaseClient.from("silo_bridged_tokens").update,
    ).toHaveBeenCalledWith({
      is_deployment_pending: false,
    })
  })

  it("returns a 403 if no valid user agent given", async () => {
    logger.error = jest.fn()

    const req = new NextRequest("https://example.com", {
      method: "GET",
    })

    const res = await GET(req, { params: {} })

    expect(res.status).toBe(403)
    expect(await res.json()).toEqual({
      statusCode: 403,
      message: "Forbidden",
      type: "/probs/forbidden",
    })

    expect(contractChangerApiClient.mirrorErc20Token).not.toHaveBeenCalled()
    expect(contractChangerApiClient.setBaseToken).not.toHaveBeenCalled()
    expect(mockSupabaseClient.from("silos").update).not.toHaveBeenCalled()
    expect(ethers.Contract).not.toHaveBeenCalled()
    expect(
      mockSupabaseClient.from("silo_config_transactions").insert,
    ).not.toHaveBeenCalled()

    expect(logger.error).toHaveBeenCalledTimes(1)
    expect(logger.error).toHaveBeenCalledWith(new Error("Forbidden"))
  })

  it.each(["CUSTOM", "ART", "BTC"])(
    "does not perform a transaction or set the silo to active for base token %p",
    async (symbol) => {
      const oneHourAgo = new Date(currentTime.getTime() - 60 * 60 * 1000)

      const mockSilo = createMockSilo({
        base_token_symbol: symbol,
        is_active: false,
        inspected_at: oneHourAgo.toISOString(),
      })

      mockSupabaseClient
        .from("silos")
        .select.mockReturnValue(createSelect([mockSilo]))
      ;(ethers.Contract as jest.Mock).mockImplementation(() => ({
        symbol: () => {},
      }))

      const req = new NextRequest("https://example.com", {
        method: "GET",
        headers: {
          "user-agent": "vercel-cron/1.0",
        },
      })

      const res = await GET(req, { params: {} })

      expect(res.status).toBe(200)
      expect(await res.json()).toEqual({
        status: 200,
        body: {
          message: "ok",
        },
      })

      expect(ethers.Contract).toHaveBeenCalledTimes(5)
      expect(
        mockSupabaseClient.from("silo_config_transactions").insert,
      ).not.toHaveBeenCalled()

      expect(contractChangerApiClient.setBaseToken).not.toHaveBeenCalled()

      expect(mockSupabaseClient.from("silos").update).toHaveBeenCalledTimes(1)
      expect(mockSupabaseClient.from("silos").update).toHaveBeenCalledWith({
        inspected_at: currentTime.toISOString(),
      })
    },
  )

  it("initialises the silo's set of bridged tokens", async () => {
    const oneHourAgo = new Date(currentTime.getTime() - 60 * 60 * 1000)

    const mockSilo = createMockSilo({
      base_token_symbol: "TURBO",
      is_active: false,
      inspected_at: oneHourAgo.toISOString(),
    })

    mockSupabaseClient
      .from("silos")
      .select.mockReturnValue(createSelect([mockSilo]))
    ;(ethers.Contract as jest.Mock).mockImplementation(() => ({
      symbol: () => {},
    }))

    mockSupabaseClient.from("bridged_tokens").select.mockImplementation(() =>
      createSelect(
        ["AURORA", "ETH", "NEAR", "USDC", "USDt", "TURBO"].map(
          (symbol, index) => ({
            ...createMockBridgedToken({ id: 42 + index, symbol }),
            silo_bridged_tokens: [],
          }),
        ),
      ),
    )

    const req = new NextRequest("https://example.com", {
      method: "GET",
      headers: {
        "user-agent": "vercel-cron/1.0",
      },
    })

    const res = await GET(req, { params: {} })

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      status: 200,
      body: {
        message: "ok",
      },
    })

    expect(
      mockSupabaseClient.from("silo_bridged_tokens").upsert,
    ).toHaveBeenCalledTimes(6)

    expect(
      mockSupabaseClient.from("silo_bridged_tokens").upsert.mock.calls,
    ).toMatchSnapshot()
  })
})
