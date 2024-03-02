/**
 * @jest-environment node
 */
import { NextRequest } from "next/server"
import { GET, PUT } from "./route"
import { createMockApiContext } from "../../../../../test-utils/create-mock-api-context"
import {
  createSelect,
  mockSupabaseClient,
} from "../../../../../test-utils/mock-supabase-client"
import { createMockDeals } from "../../../../../test-utils/factories/deal-factory"
import { proxyApiClient } from "@/utils/proxy-api/client"
import { createProxyApiObject } from "../../../../../test-utils/create-proxy-api-object"
import { mockTeam } from "../../../../../test-utils/mock-team"

jest.mock("../../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

jest.mock("../../../../utils/proxy-api/client", () => ({
  proxyApiClient: {
    view: jest.fn(async () => ({ responses: [] })),
    update: jest.fn(),
  },
}))

describe("Deal priorities route", () => {
  describe("GET", () => {
    beforeEach(() => {
      mockSupabaseClient
        .from("deals")
        .select.mockImplementation(() => createSelect([]))
    })

    it("returns an empty priorities list", async () => {
      const req = new NextRequest(
        new URL(`http://test.com/api/deals/priorities`),
      )

      const ctx = createMockApiContext()
      const result = await GET(req, ctx)

      expect(result).toEqual({
        items: [],
      })
    })

    it("returns a list of priorities", async () => {
      const mockDeals = createMockDeals(2)

      mockSupabaseClient
        .from("deals")
        .select.mockImplementation(() => createSelect(mockDeals))
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

      const req = new NextRequest(new URL(`http://test.com/api/deals`))
      const ctx = createMockApiContext()
      const result = await GET(req, ctx)

      expect(result).toEqual({
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
    })
  })

  describe("PUT", () => {
    it("updates the priority list", async () => {
      const req = new NextRequest(
        new URL(`http://test.com/api/deals/priorities`),
      )

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

      const ctx = createMockApiContext({
        body: {
          priorities,
        },
      })

      const result = await PUT(req, ctx)

      expect(result).toEqual({
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
    })
  })
})
