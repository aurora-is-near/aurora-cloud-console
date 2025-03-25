/**
 * @jest-environment node
 */
import nock from "nock"
import * as ethers from "ethers"
import { Account } from "near-api-js"
import { GET } from "./route"
import { setupJestOpenApi } from "../../../../../../test-utils/setup-jest-openapi"
import { invokeApiHandler } from "../../../../../../test-utils/invoke-api-handler"
import {
  createSelect,
  mockSupabaseClient,
} from "../../../../../../test-utils/mock-supabase-client"
import { createMockSilo } from "../../../../../../test-utils/factories/silo-factory"
import { cleanUpNock } from "../../../../../../test-utils/cleanUpNock"
import { createMockBridgedToken } from "../../../../../../test-utils/factories/bridged-token-factory"

jest.mock("ethers")
jest.mock("../../../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

jest.mock("near-api-js", () => ({
  ...jest.requireActual("near-api-js"),
  Account: jest.fn(),
  connect: jest.fn(() => ({
    connection: { provider: {} },
  })),
}))

const mockSilo = createMockSilo()

const mockNearAccount = {
  getAccountBalance: jest.fn(() => ({
    total: "33137693971864085399999999",
    available: "18370803971864085399999999",
    staked: "0",
  })),
  viewFunction: jest.fn(() => ({
    total: "12345678901234567890",
    available: "42",
  })),
}

const defaultTokenMetadata = {
  isContractDeployed: false,
  storageBalance: {
    available: "42",
    total: "12345678901234567890",
  },
}

const nearTokenMetadata = {
  isContractDeployed: false,
  storageBalance: {
    total: "33137693971864085399999999",
    available: "18370803971864085399999999",
  },
}

nock.disableNetConnect()

describe("Healthcheck route", () => {
  beforeAll(setupJestOpenApi)

  beforeEach(() => {
    mockSupabaseClient
      .from("silos")
      .select.mockImplementation(() => createSelect(mockSilo))
    ;(ethers.JsonRpcProvider as jest.Mock).mockImplementation(() => ({
      getBlock: jest
        .fn()
        .mockResolvedValue({ timestamp: Math.floor(Date.now() / 1000) }), // Current time
      getNetwork: jest.fn().mockResolvedValue({ chainId: mockSilo.chain_id }),
    }))
    ;(ethers.Contract as jest.Mock).mockImplementation(() => ({
      symbol: () => {
        throw new Error("Not implemented")
      },
    }))
    ;(Account as jest.Mock).mockImplementation(() => mockNearAccount)
  })

  afterAll(cleanUpNock)

  it("returns a valid healthcheck response with networkStatus 'ok'", async () => {
    const res = await invokeApiHandler("GET", `/api/silos/1/healthcheck`, GET)

    expect(res).toSatisfyApiSpec()
    expect(res.status).toBe(200)
    expect(res.body).toEqual({
      networkStatus: "ok",
      bridgedTokens: {},
      defaultTokens: {
        AURORA: defaultTokenMetadata,
        USDt: defaultTokenMetadata,
        USDC: defaultTokenMetadata,
        NEAR: nearTokenMetadata,
      },
    })
  })

  it("detects a stalled node when latest block is too old", async () => {
    const oldTimestamp = Math.floor(Date.now() / 1000) - 120 // 2 minutes ago (stalled)

    ;(ethers.JsonRpcProvider as jest.Mock).mockImplementation(() => ({
      getBlock: jest.fn().mockResolvedValue({ timestamp: oldTimestamp }),
      getNetwork: jest.fn().mockResolvedValue({ chainId: mockSilo.chain_id }),
    }))

    const res = await invokeApiHandler("GET", `/api/silos/1/healthcheck`, GET)

    expect(res.body).toMatchObject({ networkStatus: "stalled" })
  })

  it("returns 404 for a non-existent silo", async () => {
    mockSupabaseClient
      .from("silos")
      .select.mockImplementation(() => createSelect())

    const res = await invokeApiHandler("GET", `/api/silos/999/healthcheck`, GET)

    expect(res.status).toBe(404)
    expect(res.body).toEqual({ message: "Not Found" })
  })

  it("detects incorrect chain ID", async () => {
    ;(ethers.JsonRpcProvider as jest.Mock).mockImplementation(() => ({
      getBlock: jest
        .fn()
        .mockResolvedValue({ timestamp: Math.floor(Date.now() / 1000) }),
      getNetwork: jest.fn().mockResolvedValue({ chainId: 1 }), // Incorrect network (Ethereum)
    }))

    const res = await invokeApiHandler("GET", `/api/silos/1/healthcheck`, GET)

    expect(res.body).toMatchObject({ networkStatus: "invalid-network" })
  })

  it("checks for bridged token contracts", async () => {
    const baseTokenSymbol = "PENDING_AND_SET_AS_BASE"
    const silo = createMockSilo({
      base_token_symbol: baseTokenSymbol,
    })

    const mockTokens = [
      {
        ...createMockBridgedToken({
          symbol: "PENDING_AND_DEPLOYED",
          aurora_address: "0x1",
        }),
        silo_bridged_tokens: [
          { silo_id: silo.id, is_deployment_pending: true },
        ],
      },
      {
        ...createMockBridgedToken({
          symbol: "PENDING_AND_NOT_DEPLOYED",
          aurora_address: "0x2",
        }),
        silo_bridged_tokens: [
          { silo_id: silo.id, is_deployment_pending: true },
        ],
      },
      {
        ...createMockBridgedToken({
          symbol: baseTokenSymbol,
          aurora_address: "0x3",
        }),
        silo_bridged_tokens: [
          { silo_id: silo.id, is_deployment_pending: true },
        ],
      },
      {
        ...createMockBridgedToken({
          symbol: "PENDING_AND_NOT_BASE_AND_NO_ADDRESS",
          aurora_address: null,
        }),
        silo_bridged_tokens: [
          { silo_id: silo.id, is_deployment_pending: true },
        ],
      },
      {
        ...createMockBridgedToken({
          symbol: "NOT_PENDING",
          aurora_address: null,
        }),
        silo_bridged_tokens: [
          { silo_id: silo.id, is_deployment_pending: false },
        ],
      },
    ]

    mockSupabaseClient
      .from("silos")
      .select.mockImplementation(() => createSelect(silo))
    ;(ethers.Contract as jest.Mock).mockImplementation(
      (tokenContractAddress) => ({
        symbol: () => {
          if (tokenContractAddress === mockTokens[0].aurora_address) {
            return mockTokens[0].symbol
          }

          throw new Error("Not implemented")
        },
      }),
    )

    mockSupabaseClient
      .from("bridged_tokens")
      .select.mockImplementation(() => createSelect(mockTokens))

    const res = await invokeApiHandler(
      "GET",
      `/api/silos/${silo.id}/healthcheck`,
      GET,
    )

    expect(res.body).toEqual({
      networkStatus: "ok",
      defaultTokens: {
        AURORA: defaultTokenMetadata,
        USDt: defaultTokenMetadata,
        USDC: defaultTokenMetadata,
        NEAR: nearTokenMetadata,
      },
      bridgedTokens: {
        PENDING_AND_DEPLOYED: {
          isContractDeployed: true,
          storageBalance: defaultTokenMetadata.storageBalance,
        },
        PENDING_AND_NOT_DEPLOYED: {
          isContractDeployed: false,
          storageBalance: defaultTokenMetadata.storageBalance,
        },
        PENDING_AND_SET_AS_BASE: {
          isContractDeployed: true,
          storageBalance: defaultTokenMetadata.storageBalance,
        },
        PENDING_AND_NOT_BASE_AND_NO_ADDRESS: {
          isContractDeployed: false,
          storageBalance: defaultTokenMetadata.storageBalance,
        },
        NOT_PENDING: {
          isContractDeployed: true,
          storageBalance: defaultTokenMetadata.storageBalance,
        },
      },
    })
  })

  it("performs the expected near account checks for the default tokens", async () => {
    mockSupabaseClient
      .from("bridged_tokens")
      .select.mockImplementation(() => createSelect([]))

    const res = await invokeApiHandler("GET", "/api/silos/1/healthcheck", GET)

    expect(res.status).toBe(200)
    expect(mockNearAccount.getAccountBalance).toHaveBeenCalledTimes(1)
    expect(mockNearAccount.viewFunction).toHaveBeenCalledTimes(3)
    expect(mockNearAccount.viewFunction).toHaveBeenCalledWith({
      args: { account_id: mockSilo.engine_account },
      contractId:
        "aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near",
      methodName: "storage_balance_of",
    })

    expect(mockNearAccount.viewFunction).toHaveBeenCalledWith({
      args: { account_id: mockSilo.engine_account },
      contractId: "usdt.tether-token.near",
      methodName: "storage_balance_of",
    })

    expect(mockNearAccount.viewFunction).toHaveBeenCalledWith({
      args: { account_id: mockSilo.engine_account },
      contractId:
        "17208628f84f5d6ad33f0da3bbbeb27ffcb398eac501a31bd6ad2011e36133a1",
      methodName: "storage_balance_of",
    })
  })

  it("performs additional near account checks when we have a bridged token with a near address", async () => {
    const silo = createMockSilo()

    mockSupabaseClient
      .from("silos")
      .select.mockImplementation(() => createSelect(silo))

    mockSupabaseClient.from("bridged_tokens").select.mockImplementation(() =>
      createSelect([
        {
          ...createMockBridgedToken({
            symbol: "MYTOKEN",
            near_address: "0x1",
          }),
          silo_bridged_tokens: [
            { silo_id: silo.id, is_deployment_pending: true },
          ],
        },
      ]),
    )

    const res = await invokeApiHandler(
      "GET",
      `/api/silos/${silo.id}/healthcheck`,
      GET,
    )

    expect(res.status).toBe(200)
    expect(mockNearAccount.viewFunction).toHaveBeenCalledTimes(4)
    expect(mockNearAccount.viewFunction).toHaveBeenLastCalledWith({
      args: { account_id: silo.engine_account },
      contractId: "0x1",
      methodName: "storage_balance_of",
    })
  })

  it("does not perform additional near account checks when a bridged token has no near address", async () => {
    const silo = createMockSilo()

    mockSupabaseClient
      .from("silos")
      .select.mockImplementation(() => createSelect(silo))

    mockSupabaseClient.from("bridged_tokens").select.mockImplementation(() =>
      createSelect([
        {
          ...createMockBridgedToken({
            symbol: "MYTOKEN",
            aurora_address: "0x1",
            near_address: null,
          }),
          silo_bridged_tokens: [
            { silo_id: silo.id, is_deployment_pending: true },
          ],
        },
      ]),
    )

    const res = await invokeApiHandler(
      "GET",
      `/api/silos/${silo.id}/healthcheck`,
      GET,
    )

    expect(res.status).toBe(200)
    expect(mockNearAccount.getAccountBalance).toHaveBeenCalledTimes(1)
    expect(mockNearAccount.viewFunction).toHaveBeenCalledTimes(3)
  })

  it("checks the account balance twice if near is bridged", async () => {
    const silo = createMockSilo()

    mockSupabaseClient
      .from("silos")
      .select.mockImplementation(() => createSelect(silo))

    mockSupabaseClient.from("bridged_tokens").select.mockImplementation(() =>
      createSelect([
        {
          ...createMockBridgedToken({
            symbol: "NEAR",
            near_address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
          }),
          silo_bridged_tokens: [
            { silo_id: silo.id, is_deployment_pending: true },
          ],
        },
      ]),
    )

    const res = await invokeApiHandler(
      "GET",
      `/api/silos/${silo.id}/healthcheck`,
      GET,
    )

    expect(res.status).toBe(200)
    expect(mockNearAccount.getAccountBalance).toHaveBeenCalledTimes(2)
  })
})
