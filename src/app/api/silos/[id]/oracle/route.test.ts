/**
 * @jest-environment node
 */
import { auroraOracleApiClient } from "@/utils/aurora-oracle-api/client"
import { GET, POST } from "./route"
import {
  createInsertOrUpdate,
  createSelect,
  mockSupabaseClient,
} from "../../../../../../test-utils/mock-supabase-client"
import { setupJestOpenApi } from "../../../../../../test-utils/setup-jest-openapi"
import { invokeApiHandler } from "../../../../../../test-utils/invoke-api-handler"
import { createMockSilo } from "../../../../../../test-utils/factories/silo-factory"
import { createMockOracle } from "../../../../../../test-utils/factories/oracle-factory"

jest.mock("../../../../../utils/aurora-oracle-api/client")
jest.mock("../../../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

describe("Oracles route", () => {
  beforeAll(setupJestOpenApi)

  beforeEach(() => {
    mockSupabaseClient
      .from("silos")
      .select.mockImplementation(() => createSelect())

    mockSupabaseClient
      .from("oracles")
      .select.mockImplementation(() => createSelect())
    ;(auroraOracleApiClient.getContracts as jest.Mock).mockResolvedValue({
      items: [],
    })
  })

  describe("GET", () => {
    it("returns a 404 for a non-existant silo", async () => {
      await expect(async () =>
        invokeApiHandler("GET", "/api/silos/1/oracle", GET),
      ).rejects.toThrow("Not Found")
    })

    it("returns a 404 for a non-existant oracle", async () => {
      await expect(async () =>
        invokeApiHandler("GET", "/api/silos/1/oracle", GET),
      ).rejects.toThrow("Not Found")
    })

    it("returns an enabled oracle", async () => {
      const mockOracle = createMockOracle()

      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))

      mockSupabaseClient
        .from("oracles")
        .select.mockImplementation(() => createSelect(mockOracle))

      const res = await invokeApiHandler("GET", "/api/silos/1/oracle", GET)

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        createdAt: mockOracle.created_at,
        updatedAt: mockOracle.updated_at,
        address: null,
      })
    })

    it("returns an enabled and deployed oracle", async () => {
      const mockOracle = createMockOracle()
      const mockSilo = createMockSilo()

      ;(auroraOracleApiClient.getContracts as jest.Mock).mockResolvedValue({
        items: [
          {
            id: 1,
            rpcUrl: mockSilo.rpc_url,
            chainId: mockSilo.chain_id,
            name: mockSilo.name,
            address: "0x123",
          },
        ],
      })

      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(mockSilo))

      mockSupabaseClient
        .from("oracles")
        .select.mockImplementation(() => createSelect(mockOracle))

      const res = await invokeApiHandler("GET", "/api/silos/1/oracle", GET)

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        createdAt: mockOracle.created_at,
        updatedAt: mockOracle.updated_at,
        address: "0x123",
      })
    })
  })

  describe("POST", () => {
    it("returns a 404 for a non-existant silo", async () => {
      await expect(async () =>
        invokeApiHandler("POST", "/api/silos/1/oracle", POST),
      ).rejects.toThrow("Not Found")
    })

    it("returns a 400 if the oracle already exists", async () => {
      mockSupabaseClient
        .from("oracles")
        .select.mockImplementation(() => createSelect(createMockOracle()))

      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))

      let error

      try {
        await invokeApiHandler("POST", "/api/silos/1/oracle", POST)
      } catch (e) {
        error = e
      }

      expect(error).toBeDefined()
    })

    it("creates an oracle", async () => {
      const mockOracle = createMockOracle()

      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))

      mockSupabaseClient
        .from("oracles")
        .insert.mockImplementation(() => createInsertOrUpdate(mockOracle))

      const res = await invokeApiHandler("POST", "/api/silos/1/oracle", POST, {
        body: {},
      })

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        createdAt: mockOracle.created_at,
        updatedAt: mockOracle.updated_at,
        address: null,
      })

      expect(mockSupabaseClient.from("oracles").insert).toHaveBeenCalledWith({
        silo_id: 1,
      })
    })
  })
})
