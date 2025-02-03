/**
 * @jest-environment node
 */
import { GET, PUT } from "./route"
import {
  createInsertOrUpdate,
  createSelect,
  mockSupabaseClient,
} from "../../../../../test-utils/mock-supabase-client"
import { createMockDeal } from "../../../../../test-utils/factories/deal-factory"
import { mockTeam } from "../../../../../test-utils/mock-team"
import { setupJestOpenApi } from "../../../../../test-utils/setup-jest-openapi"
import { invokeApiHandler } from "../../../../../test-utils/invoke-api-handler"

jest.mock("../../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

describe("Deal route", () => {
  beforeAll(setupJestOpenApi)

  describe("GET", () => {
    it("throws a not found error if no matching deal", async () => {
      const res = await invokeApiHandler("GET", "/api/deals/1", GET)

      expect(res.status).toBe(404)
      expect(res.body).toEqual({ message: "Not Found" })
    })

    it("returns a deal", async () => {
      const mockDeal = createMockDeal()
      const dealSelectQueries = createSelect(mockDeal)

      mockSupabaseClient
        .from("deals")
        .select.mockImplementation(() => dealSelectQueries)

      const res = await invokeApiHandler("GET", "/api/deals/1", GET, {
        params: { id: String(mockDeal.id) },
      })

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        id: mockDeal.id,
        siloId: mockDeal.silo_id,
        teamId: mockDeal.team_id,
        name: mockDeal.name,
        open: mockDeal.open,
        enabled: mockDeal.enabled,
        endTime: mockDeal.end_time,
        startTime: mockDeal.start_time,
        createdAt: mockDeal.created_at,
        updatedAt: mockDeal.updated_at,
        deletedAt: mockDeal.deleted_at,
      })

      expect(dealSelectQueries.eq).toHaveBeenCalledWith("id", mockDeal.id)
    })
  })

  describe("PUT", () => {
    it("updates a deal", async () => {
      const body = {
        name: "Test Update",
        open: true,
        enabled: true,
        startTime: "2021-01-02T00:00:00.000Z",
        endTime: "2021-01-02T00:00:00.000Z",
      }

      const mockDeal = createMockDeal(body)
      const putQueries = createInsertOrUpdate(mockDeal)

      mockSupabaseClient
        .from("deals")
        .update.mockImplementation(() => putQueries)

      const res = await invokeApiHandler(
        "PUT",
        `/api/deals/${mockDeal.id}`,
        PUT,
        {
          params: {
            id: String(mockDeal.id),
          },
          body,
        },
      )

      expect(res).toSatisfyApiSpec()

      expect(res.body).toEqual({
        id: mockDeal.id,
        siloId: mockDeal.silo_id,
        teamId: mockDeal.team_id,
        name: mockDeal.name,
        open: mockDeal.open,
        enabled: mockDeal.enabled,
        startTime: mockDeal.start_time,
        endTime: mockDeal.end_time,
        createdAt: mockDeal.created_at,
        updatedAt: mockDeal.updated_at,
        deletedAt: mockDeal.deleted_at,
      })

      expect(putQueries.eq).toHaveBeenCalledTimes(1)
      expect(putQueries.eq).toHaveBeenCalledWith("id", mockDeal.id)
    })
  })
})
