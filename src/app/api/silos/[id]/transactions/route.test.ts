/**
 * @jest-environment node
 */
import * as pg from "pg"
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

jest.mock("../../../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

describe("Silo transactions route", () => {
  beforeAll(setupJestOpenApi)

  beforeEach(() => {
    mockSupabaseClient
      .from("silos")
      .select.mockImplementation(() => createSelect())

    mockSupabaseClient
      .from("deals")
      .select.mockImplementation(() => createSelect())
    ;(pg.Pool as unknown as jest.Mock).mockImplementation(() => ({
      connect: jest.fn(() => ({
        query: jest.fn(() => ({
          rows: [],
        })),
        release: jest.fn(),
      })),
    }))
  })

  describe("GET", () => {
    it("returns a 404 for a non-existant silo", async () => {
      const res = await invokeApiHandler(
        "GET",
        "/api/silos/1/transactions",
        GET,
      )

      expect(res.status).toBe(404)
      expect(res.body).toEqual({ message: "Not Found" })
    })

    it("returns the data for a silo when no transaction data", async () => {
      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))

      const res = await invokeApiHandler(
        "GET",
        "/api/silos/1/transactions",
        GET,
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
