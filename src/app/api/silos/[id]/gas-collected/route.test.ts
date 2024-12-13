/**
 * @jest-environment node
 */
import { GET } from "./route"
import {
  createSelect,
  mockSupabaseClient,
} from "../../../../../../test-utils/mock-supabase-client"
import { setupJestOpenApi } from "../../../../../../test-utils/setup-jest-openapi"
import { invokeApiHandler } from "../../../../../../test-utils/invoke-api-handler"
import { createMockSilo } from "../../../../../../test-utils/factories/silo-factory"
import { query } from "../../../../../utils/blockscout-db/query"

jest.mock("../../../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

jest.mock("../../../../../utils/blockscout-db/query")

describe("Collected gas route", () => {
  beforeAll(setupJestOpenApi)

  describe("GET", () => {
    it("returns a 404 for a non-existant silo", async () => {
      await expect(async () =>
        invokeApiHandler(
          "GET",
          "/api/silos/1/gas-collected?startDate=2024-11-01&endDate=2024-11-30",
          GET,
        ),
      ).rejects.toThrow("Not Found")
    })

    it("returns a 400 for an invalid date range", async () => {
      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))

      await expect(async () =>
        invokeApiHandler(
          "GET",
          "/api/silos/1/gas-collected?startDate=2024-11-01&endDate=2024-10-30",
          GET,
        ),
      ).rejects.toThrow("End date must be later than start date")
    })

    it("returns a 400 for too long period", async () => {
      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))

      await expect(async () =>
        invokeApiHandler(
          "GET",
          "/api/silos/1/gas-collected?startDate=2024-11-01&endDate=2025-04-30",
          GET,
        ),
      ).rejects.toThrow("Requested period is too long (more than 3 months)")
    })

    it("returns an empty array for no gas for the given period", async () => {
      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))
      ;(query as jest.Mock).mockImplementation(() => ({ rows: [] }))

      const res = await invokeApiHandler(
        "GET",
        "/api/silos/1/gas-collected?startDate=2024-11-01&endDate=2024-11-30",
        GET,
      )

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        count: 0,
        items: Array.from({ length: 30 }, (_, index) => ({
          day: `2024-11-${String(index + 1).padStart(2, "0")}`,
          count: 0,
        })),
      })
    })

    it("returns the data for collected gas over a time period", async () => {
      const mockSilo = createMockSilo()

      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(mockSilo))
      ;(query as jest.Mock)
        .mockImplementationOnce(() => ({
          rows: [{ count: 150 }],
        }))
        .mockImplementationOnce(() => ({
          rows: Array.from({ length: 30 }, (_, index) => ({
            day: `2024-11-${index + 1}`,
            count: index + 1,
          })),
        }))

      const res = await invokeApiHandler(
        "GET",
        "/api/silos/1/gas-collected?startDate=2024-11-01&endDate=2024-11-30",
        GET,
      )

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        count: 150,
        items: Array.from({ length: 30 }, (_, index) => ({
          day: `2024-11-${String(index + 1).padStart(2, "0")}`,
          count: index + 1,
        })),
      })
    })
  })
})
