/**
 * @jest-environment node
 */
import { proxyApiClient } from "@/utils/proxy-api/client"
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

jest.mock("../../../../utils/proxy-api/client")

describe("Deal route", () => {
  beforeAll(setupJestOpenApi)

  beforeEach(() => {
    ;(proxyApiClient.view as jest.Mock).mockResolvedValue({ responses: [] })
  })

  describe("GET", () => {
    it("throws a not found error if no matching deal", async () => {
      await expect(async () =>
        invokeApiHandler("GET", "/api/deals/1", GET),
      ).rejects.toThrow("Not Found")
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

      expect(dealSelectQueries.eq).toHaveBeenCalledTimes(2)
      expect(dealSelectQueries.eq).toHaveBeenCalledWith("id", mockDeal.id)
      expect(dealSelectQueries.eq).toHaveBeenCalledWith("team_id", mockTeam.id)
    })
  })

  describe("PUT", () => {
    it("updates a deal", async () => {
      const mockDeal = createMockDeal()
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
          body: {
            name: "Test Update",
            open: mockDeal.open,
            enabled: mockDeal.enabled,
            startTime: "2021-01-02T00:00:00.000Z",
            endTime: "2021-01-02T00:00:00.000Z",
          },
        },
      )

      expect(res).toSatisfyApiSpec()

      console.log(res.status)
      console.log(mockDeal)

      expect(res.body).toEqual({
        id: mockDeal.id,
        siloId: mockDeal.silo_id,
        teamId: mockDeal.team_id,
        name: "Test Update",
        open: mockDeal.open,
        enabled: mockDeal.enabled,
        startTime: "2021-01-02T00:00:00.000Z",
        endTime: "2021-01-02T00:00:00.000Z",
        createdAt: mockDeal.created_at,
        updatedAt: mockDeal.updated_at,
        deletedAt: mockDeal.deleted_at,
      })

      expect(putQueries.eq).toHaveBeenCalledTimes(1)
      expect(putQueries.eq).toHaveBeenCalledWith("id", mockDeal.id)
    })
  })
})
