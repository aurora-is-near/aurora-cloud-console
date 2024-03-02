/**
 * @jest-environment node
 */
import { NextRequest } from "next/server"
import { GET } from "./route"
import { createMockApiContext } from "../../../../../test-utils/create-mock-api-context"
import {
  createSelect,
  mockSupabaseClient,
} from "../../../../../test-utils/mock-supabase-client"
import { createMockDeals } from "../../../../../test-utils/factories/deal-factory"
import { proxyApiClient } from "@/utils/proxy-api/client"
import { createProxyApiObject } from "../../../../../test-utils/create-proxy-api-object"

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
            objects: [createProxyApiObject("42"), createProxyApiObject("43")],
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
            priority: "42",
          },
          {
            dealId: 2,
            name: "Test Deal 2",
            priority: "43",
          },
        ],
      })
    })
  })
})
