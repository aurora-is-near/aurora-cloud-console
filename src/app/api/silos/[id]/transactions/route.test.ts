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
      await expect(async () =>
        invokeApiHandler("GET", "/api/silos/1/transactions", GET),
      ).rejects.toThrow("Not Found")
    })

    it("returns an empty array for a silo with no deals", async () => {
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
        items: [],
      })
    })

    it("returns the data for a silo when multiple deals and no transaction data", async () => {
      const mockDeals = createMockDeals(2)
      const dealSelectQueries = createSelect(mockDeals)

      // This is to match the `getDealKey` query.
      dealSelectQueries.eq.mockImplementation((key, value) => {
        if (key === "id") {
          return {
            single: async () => {
              const deal = mockDeals.find((mockDeal) => mockDeal.id === value)

              return { data: { ...deal, teams: [mockTeam] } }
            },
          }
        }

        return dealSelectQueries
      })

      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))

      mockSupabaseClient
        .from("deals")
        .select.mockImplementation(() => dealSelectQueries)

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
              label: "Test Deal 1",
              transactionsCount: 0,
              transactionsPerDay: [],
              walletsCount: 0,
              walletsPerDay: [],
            },
            siloId: 1,
          },
          {
            data: {
              label: "Test Deal 2",
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
