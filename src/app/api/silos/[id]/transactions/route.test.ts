/**
 * @jest-environment node
 */
import * as pg from "pg"
import { logger } from "@/logger"
import { GET } from "./route"
import {
  createSelect,
  mockSupabaseClient,
} from "../../../../../../test-utils/mock-supabase-client"
import { setupJestOpenApi } from "../../../../../../test-utils/setup-jest-openapi"
import { invokeApiHandler } from "../../../../../../test-utils/invoke-api-handler"
import { createMockSilo } from "../../../../../../test-utils/factories/silo-factory"
import { createMockDeals } from "../../../../../../test-utils/factories/deal-factory"
import { mockTeam } from "../../../../../../test-utils/mock-team"
import { createBlockscoutDatabase } from "../../../../../../test-utils/factories/blockscout-database-factory"

jest.mock("../../../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

const originalLoggerWarn = logger.warn

const mockPgClient = {
  query: jest.fn(),
}

describe("Silo transactions route", () => {
  beforeAll(setupJestOpenApi)

  beforeEach(() => {
    mockSupabaseClient
      .from("silos")
      .select.mockImplementation(() => createSelect())

    mockSupabaseClient
      .from("blockscout_databases")
      .select.mockImplementation(() => createSelect())

    mockSupabaseClient
      .from("deals")
      .select.mockImplementation(() => createSelect())
    ;(pg.Pool as unknown as jest.Mock).mockImplementation(() => mockPgClient)
    mockPgClient.query.mockResolvedValue({ rows: [] })
  })

  afterEach(() => {
    logger.warn = originalLoggerWarn
  })

  describe("GET", () => {
    it("returns some transaction data", async () => {
      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))

      mockSupabaseClient
        .from("blockscout_databases")
        .select.mockImplementation(() =>
          createSelect(createBlockscoutDatabase()),
        )

      mockPgClient.query.mockResolvedValueOnce({ rows: [{ count: 10 }] })
      mockPgClient.query.mockResolvedValueOnce({ rows: [{ count: 20 }] })
      mockPgClient.query.mockResolvedValueOnce({
        rows: [
          {
            day: "2023-10-01",
            count: 5,
          },
          {
            day: "2023-10-02",
            count: 6,
          },
        ],
      })

      mockPgClient.query.mockResolvedValueOnce({
        rows: [
          {
            day: "2023-10-01",
            count: 15,
          },
          {
            day: "2023-10-02",
            count: 16,
          },
        ],
      })

      const res = await invokeApiHandler(
        "GET",
        "/api/silos/1/transactions",
        GET,
        { params: { id: "1" } },
      )

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        items: [
          {
            data: {
              label: "Test Silo",
              transactionsCount: 10,
              transactionsPerDay: [
                {
                  day: "2023-10-01",
                  count: 5,
                },
                {
                  day: "2023-10-02",
                  count: 6,
                },
              ],
              walletsCount: 20,
              walletsPerDay: [
                {
                  day: "2023-10-01",
                  count: 15,
                },
                {
                  day: "2023-10-02",
                  count: 16,
                },
              ],
            },
            siloId: 1,
          },
        ],
      })
    })

    it("returns a 404 for a non-existant silo", async () => {
      const res = await invokeApiHandler(
        "GET",
        "/api/silos/1/transactions",
        GET,
        { params: { id: "1" } },
      )

      expect(res.status).toBe(404)
      expect(res.body).toEqual({ message: "Not Found" })
    })

    it("logs a warning and returns the expected response when no blockscout database set", async () => {
      logger.warn = jest.fn()

      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))

      const res = await invokeApiHandler(
        "GET",
        "/api/silos/1/transactions",
        GET,
        { params: { id: "1" } },
      )

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        items: [
          {
            data: {
              label: "Test Silo",
              transactionsCount: 0,
              transactionsPerDay: [],
              walletsCount: 0,
              walletsPerDay: [],
            },
            siloId: 1,
          },
        ],
      })

      expect(logger.warn).toHaveBeenCalledTimes(1)
      expect(logger.warn).toHaveBeenCalledWith(
        "No blockscout database found for silo 1",
      )
    })

    it("returns the data for a silo when no transaction data", async () => {
      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))

      mockSupabaseClient
        .from("blockscout_databases")
        .select.mockImplementation(() =>
          createSelect(createBlockscoutDatabase()),
        )

      const res = await invokeApiHandler(
        "GET",
        "/api/silos/1/transactions",
        GET,
        { params: { id: "1" } },
      )

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        items: [
          {
            data: {
              label: "Test Silo",
              transactionsCount: 0,
              transactionsPerDay: [],
              walletsCount: 0,
              walletsPerDay: [],
            },
            siloId: 1,
          },
        ],
      })
    })
  })
})
