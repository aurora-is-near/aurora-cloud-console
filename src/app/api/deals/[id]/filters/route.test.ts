/**
 * @jest-environment node
 */
import { proxyApiClient } from "@/utils/proxy-api/client"
import { GET } from "./route"
import { setupJestOpenApi } from "../../../../../../test-utils/setup-jest-openapi"
import {
  createSelect,
  mockSupabaseClient,
} from "../../../../../../test-utils/mock-supabase-client"
import { invokeApiHandler } from "../../../../../../test-utils/invoke-api-handler"
import { createMockFilters } from "../../../../../../test-utils/factories/filter-factory"
import { createMockDeal } from "../../../../../../test-utils/factories/deal-factory"

jest.mock("../../../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

jest.mock("../../../../../utils/proxy-api/client")

describe("Filters route", () => {
  beforeAll(setupJestOpenApi)

  beforeEach(() => {
    ;(proxyApiClient.view as jest.Mock).mockResolvedValue({ responses: [] })
  })

  describe("GET", () => {
    beforeEach(() => {
      mockSupabaseClient
        .from("filters")
        .select.mockImplementation(() => createSelect([]))
    })

    it("returns an empty filters list", async () => {
      const res = await invokeApiHandler("GET", "/api/deals/1/filters", GET)

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        items: [],
      })
    })

    it("returns filters for a deal", async () => {
      const mockDeal = createMockDeal()
      const mockFilters = createMockFilters(mockDeal.id, 2)
      const filterSelectQueries = createSelect(mockFilters)

      mockSupabaseClient
        .from("filters")
        .select.mockImplementation(() => filterSelectQueries)

      const res = await invokeApiHandler("GET", "/api/deals/1/filters", GET, {
        params: { id: String(mockDeal.id) },
      })

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        items: mockFilters,
      })
      expect(filterSelectQueries.eq).toHaveBeenCalledWith(
        "deal_id",
        mockDeal.id,
      )
    })
  })
})
