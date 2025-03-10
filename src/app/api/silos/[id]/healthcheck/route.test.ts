/**
 * @jest-environment node
 */
import nock from "nock"
import * as ethers from "ethers"
import { GET } from "./route"
import { setupJestOpenApi } from "../../../../../../test-utils/setup-jest-openapi"
import { invokeApiHandler } from "../../../../../../test-utils/invoke-api-handler"
import {
  createSelect,
  mockSupabaseClient,
} from "../../../../../../test-utils/mock-supabase-client"
import { createMockSilo } from "../../../../../../test-utils/factories/silo-factory"
import { cleanUpNock } from "../../../../../../test-utils/cleanUpNock"

jest.mock("ethers")
jest.mock("../../../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

const mockSilo = createMockSilo()

nock.disableNetConnect()

describe("Healthcheck route", () => {
  beforeAll(setupJestOpenApi)

  beforeEach(() => {
    mockSupabaseClient
      .from("silos")
      .select.mockImplementation(() => createSelect(mockSilo))

    // Mock ethers provider
    ;(ethers.JsonRpcProvider as jest.Mock).mockImplementation(() => ({
      getBlock: jest
        .fn()
        .mockResolvedValue({ timestamp: Math.floor(Date.now() / 1000) }), // Current time
      getNetwork: jest.fn().mockResolvedValue({ chainId: mockSilo.chain_id }),
    }))
  })

  afterAll(cleanUpNock)

  it("returns a valid healthcheck response with networkStatus 'ok'", async () => {
    const res = await invokeApiHandler("GET", `/api/silos/1/healthcheck`, GET)

    expect(res).toSatisfyApiSpec()
    expect(res.status).toBe(200)
    expect(res.body).toEqual({
      networkStatus: "ok",
      defaultTokenContractsDeployed: expect.any(Object),
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
})
