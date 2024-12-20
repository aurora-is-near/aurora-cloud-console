/**
 * @jest-environment node
 */
import { logger } from "@/logger"
import { GET } from "./route"
import {
  createSelect,
  mockSupabaseClient,
} from "../../../../../../test-utils/mock-supabase-client"
import { setupJestOpenApi } from "../../../../../../test-utils/setup-jest-openapi"
import { invokeApiHandler } from "../../../../../../test-utils/invoke-api-handler"
import { createMockSilo } from "../../../../../../test-utils/factories/silo-factory"
import { query as blockscoutQuery } from "../../../../../utils/blockscout-db/query"
import { createBlockscoutDatabase } from "../../../../../../test-utils/factories/blockscout-database-factory"

jest.mock("../../../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

jest.mock("../../../../../utils/blockscout-db/query")

const originalLoggerWarn = logger.warn

describe("Collected gas total route", () => {
  beforeAll(setupJestOpenApi)

  afterEach(() => {
    logger.warn = originalLoggerWarn
  })

  describe("GET", () => {
    beforeEach(() => {
      mockSupabaseClient
        .from("blockscout_databases")
        .select.mockImplementation(() =>
          createSelect(createBlockscoutDatabase()),
        )
    })

    it("returns a 404 for a non-existant silo", async () => {
      await expect(async () =>
        invokeApiHandler("GET", "/api/silos/1/gas-collected-total", GET, {
          params: { id: "1" },
        }),
      ).rejects.toThrow("Not Found")
    })

    it("returns 0 count if no blockscout database found", async () => {
      logger.warn = jest.fn()
      mockSupabaseClient
        .from("blockscout_databases")
        .select.mockImplementation(() => createSelect())

      mockSupabaseClient.from("silos").select.mockImplementation(() =>
        createSelect(
          createMockSilo({
            blockscout_database_id: null,
          }),
        ),
      )

      const res = await invokeApiHandler(
        "GET",
        "/api/silos/1/gas-collected-total",
        GET,
        { params: { id: "1" } },
      )

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        count: 0,
      })

      expect(blockscoutQuery).not.toHaveBeenCalled()
      expect(logger.warn).toHaveBeenCalledTimes(1)
      expect(logger.warn).toHaveBeenCalledWith(
        "Cannot query total gas collected as no blockscout database found for silo 1",
      )
    })

    it("returns the data for total collected gas", async () => {
      const mockSilo = createMockSilo()

      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(mockSilo))
      ;(blockscoutQuery as jest.Mock)
        .mockImplementationOnce(() => ({
          rows: [{ count: 150 }],
        }))
        .mockImplementationOnce(() => ({
          rows: Array.from({ length: 30 }, (_, index) => ({
            count: index + 1,
          })),
        }))

      const res = await invokeApiHandler(
        "GET",
        "/api/silos/1/gas-collected-total",
        GET,
        { params: { id: "1" } },
      )

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        count: 150,
      })
    })
  })
})
