/**
 * @jest-environment node
 */
import { GET } from "./route"
import {
  createSelect,
  mockSupabaseClient,
} from "../../../../test-utils/mock-supabase-client"
import { createMockDeal } from "../../../../test-utils/factories/deal-factory"
import { mockTeam } from "../../../../test-utils/mock-team"
import { setupJestOpenApi } from "../../../../test-utils/setup-jest-openapi"
import { invokeApiHandler } from "../../../../test-utils/invoke-api-handler"

jest.mock("../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

describe("Deals route", () => {
  beforeAll(setupJestOpenApi)

  describe("GET", () => {
    beforeEach(() => {
      mockSupabaseClient
        .from("deals")
        .select.mockImplementation(() => createSelect([]))
    })

    it("returns an empty deals list", async () => {
      const res = await invokeApiHandler("GET", "/api/deals", GET)

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        items: [],
      })
    })

    it("returns a deal", async () => {
      const mockDeal = createMockDeal()
      const dealSelectQueries = createSelect([mockDeal])

      mockSupabaseClient
        .from("deals")
        .select.mockImplementation(() => dealSelectQueries)

      const res = await invokeApiHandler("GET", "/api/deals", GET)

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        items: [
          {
            createdAt: mockDeal.created_at,
            endTime: mockDeal.end_time,
            id: mockDeal.id,
            name: mockDeal.name,
            startTime: mockDeal.start_time,
            teamId: mockDeal.team_id,
            updatedAt: mockDeal.updated_at,
            deletedAt: mockDeal.deleted_at,
            open: mockDeal.open,
            enabled: mockDeal.enabled,
            siloId: mockDeal.silo_id,
          },
        ],
      })

      expect(dealSelectQueries.eq).toHaveBeenCalledTimes(1)
      expect(dealSelectQueries.eq).toHaveBeenCalledWith("team_id", mockTeam.id)
    })
  })
})
