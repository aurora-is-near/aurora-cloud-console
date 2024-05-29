/**
 * @jest-environment node
 */
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
  })

  describe("GET", () => {
    it("returns a 404 for a non-existant silo", async () => {
      await expect(async () =>
        invokeApiHandler("GET", "/api/silos/1/oracle", GET),
      ).rejects.toThrow("Not Found")
    })

    it("returns a disabled oracle", async () => {
      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))

      const res = await invokeApiHandler("GET", "/api/silos/1/oracle", GET)

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        enabled: false,
        createdAt: null,
        updatedAt: null,
        deployedAt: null,
      })
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
        enabled: true,
        createdAt: mockOracle.created_at,
        updatedAt: mockOracle.updated_at,
        deployedAt: mockOracle.deployed_at,
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

      expect(error).not.toBeUndefined()
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
        enabled: true,
        createdAt: mockOracle.created_at,
        updatedAt: mockOracle.updated_at,
        deployedAt: mockOracle.deployed_at,
      })

      expect(mockSupabaseClient.from("oracles").insert).toHaveBeenCalledWith({
        silo_id: 1,
      })
    })
  })
})
