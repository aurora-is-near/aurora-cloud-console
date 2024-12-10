/**
 * @jest-environment node
 */
import { GET } from "./route"
import {
  createSelect,
  mockSupabaseClient,
} from "../../../../test-utils/mock-supabase-client"
import { setupJestOpenApi } from "../../../../test-utils/setup-jest-openapi"
import { invokeApiHandler } from "../../../../test-utils/invoke-api-handler"
import { createMockLimit } from "../../../../test-utils/factories/limit-factory"
import { createMockDeal } from "../../../../test-utils/factories/deal-factory"

jest.mock("../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

describe("Limits route", () => {
  beforeAll(setupJestOpenApi)

  describe("GET", () => {
    beforeEach(() => {
      mockSupabaseClient
        .from("limits")
        .select.mockImplementation(() => createSelect([]))
    })

    it("returns an empty limits list", async () => {
      const res = await invokeApiHandler("GET", "/api/deals/1/limits", GET, {
        params: { deal_id: "1" },
      })

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        items: [],
      })
    })

    it("returns a limit", async () => {
      const mockDeal = createMockDeal()
      const mockLimit = createMockLimit()
      const limitSelectQueries = createSelect([mockLimit])

      mockSupabaseClient
        .from("limits")
        .select.mockImplementation(() => limitSelectQueries)

      const res = await invokeApiHandler("GET", "/api/deals/1/limits", GET, {
        params: { deal_id: String(mockDeal.id) },
      })

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        items: [
          {
            id: mockLimit.id,
            dealId: mockLimit.deal_id,
            limitValue: mockLimit.limit_value,
            limitType: mockLimit.limit_type,
            limitScope: mockLimit.limit_scope,
            duration: mockLimit.duration,
            createdAt: mockLimit.created_at,
            updatedAt: mockLimit.updated_at,
          },
        ],
      })

      expect(limitSelectQueries.eq).toHaveBeenCalledTimes(1)
      expect(limitSelectQueries.eq).toHaveBeenCalledWith(
        "deal_id",
        String(mockLimit.deal_id),
      )
    })
  })
})
