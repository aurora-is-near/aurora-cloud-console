/**
 * @jest-environment node
 */
import { GET, PUT } from "./route"
import {
  createSelect,
  mockSupabaseClient,
} from "../../../../../test-utils/mock-supabase-client"
import { createMockDeals } from "../../../../../test-utils/factories/deal-factory"
import { proxyApiClient } from "@/utils/proxy-api/client"
import { createProxyApiObject } from "../../../../../test-utils/create-proxy-api-object"
import { mockTeam } from "../../../../../test-utils/mock-team"
import { invokeApiHandler } from "../../../../../test-utils/invoke-api-handler"
import { setupJestOpenApi } from "../../../../../test-utils/setup-jest-openapi"

jest.mock("../../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

jest.mock("../../../../utils/proxy-api/client")

describe("Deal priorities route", () => {
  beforeAll(setupJestOpenApi)

  beforeEach(() => {
    ;(proxyApiClient.view as jest.Mock).mockResolvedValue({ responses: [] })
  })

  describe("GET", () => {
    beforeEach(() => {
      mockSupabaseClient
        .from("deals")
        .select.mockImplementation(() => createSelect([]))
    })

    it("returns an empty priorities list", async () => {
      const res = await invokeApiHandler("GET", "/api/deals/priorities", GET)

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        items: [],
      })
    })

    it("returns a list of priorities", async () => {
      const mockDeals = createMockDeals(2)
      const dealSelectQueries = createSelect(mockDeals)

      mockSupabaseClient
        .from("deals")
        .select.mockImplementation(() => dealSelectQueries)
      ;(proxyApiClient.view as jest.Mock).mockResolvedValue({
        responses: [
          {
            objects: [
              createProxyApiObject("0042"),
              createProxyApiObject("0043"),
            ],
          },
          {
            objects: [
              createProxyApiObject("1", {
                StringVar: {
                  value: mockDeals[0].id.toString(),
                },
              }),
              createProxyApiObject("2", {
                StringVar: {
                  value: mockDeals[1].id.toString(),
                },
              }),
            ],
          },
        ],
      })

      const res = await invokeApiHandler("GET", "/api/deals/priorities", GET)

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        items: [
          {
            dealId: 1,
            name: "Test Deal 1",
            priority: "0042",
          },
          {
            dealId: 2,
            name: "Test Deal 2",
            priority: "0043",
          },
        ],
      })

      expect(dealSelectQueries.eq).toHaveBeenCalledTimes(1)
      expect(dealSelectQueries.eq).toHaveBeenCalledWith("team_id", mockTeam.id)
    })
  })

  describe("PUT", () => {
    it("updates the priority list", async () => {
      const mockDeals = createMockDeals(2)
      const dealSelectQueries = createSelect(mockDeals)

      mockSupabaseClient
        .from("deals")
        .select.mockImplementation(() => dealSelectQueries)

      const priorities = [
        {
          dealId: 1,
          priority: "0042",
        },
        {
          dealId: 2,
          priority: "0043",
        },
      ]

      const res = await invokeApiHandler("PUT", "/api/deals/priorities", PUT, {
        body: {
          priorities,
        },
      })

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        items: [
          {
            dealId: 1,
            name: "Test Deal 1",
            priority: "0042",
          },
          {
            dealId: 2,
            name: "Test Deal 2",
            priority: "0043",
          },
        ],
      })

      expect(proxyApiClient.update).toHaveBeenCalledTimes(2)

      priorities.forEach(({ dealId, priority }, index) => {
        expect(proxyApiClient.update).toHaveBeenNthCalledWith(index + 1, [
          {
            op_type: "set",
            template_key: "template::deal::acc::pointer",
            var_key: `deal::acc::customers::${mockTeam.id}::dealByPrio::${priority}`,
            var_type: "string",
          },
          {
            op_type: "set_value",
            string_value: dealId.toString(),
            var_key: `deal::acc::customers::${mockTeam.id}::dealByPrio::${priority}`,
            var_type: "string",
          },
          {
            op_type: "insert",
            set_element: priority,
            var_key: `deal::acc::customers::${mockTeam.id}::dealPrios`,
            var_type: "set",
          },
        ])
      })

      expect(dealSelectQueries.eq).toHaveBeenCalledTimes(1)
      expect(dealSelectQueries.eq).toHaveBeenCalledWith("team_id", mockTeam.id)
    })
  })
})
