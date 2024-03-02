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
import { createMockDeal } from "../../../../../test-utils/factories/deal-factory"
import { proxyApiClient } from "@/utils/proxy-api/client"
import { createProxyApiObject } from "../../../../../test-utils/create-proxy-api-object"
import { createMockList } from "../../../../../test-utils/factories/list-factory"
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

describe("Deal route", () => {
  describe("GET", () => {
    beforeEach(() => {
      mockSupabaseClient.from("deals")

      mockSupabaseClient
        .from("lists")
        .select.mockImplementation(() => createSelect([]))
    })

    it("throws a not found error if no matching deal", async () => {
      const req = new NextRequest(new URL(`http://test.com/api/deals`))
      const ctx = createMockApiContext()

      expect(() => GET(req, ctx)).rejects.toThrow("Not Found")
    })

    it("returns a  deal", async () => {
      const mockDeal = createMockDeal()

      mockSupabaseClient
        .from("deals")
        .select.mockImplementation(() => createSelect(mockDeal))

      const req = new NextRequest(new URL(`http://test.com/api/deals`))
      const ctx = createMockApiContext()
      const result = await GET(req, ctx)

      expect(result).toEqual({
        createdAt: mockDeal.created_at,
        enabled: false,
        endTime: null,
        id: mockDeal.id,
        lists: {
          autoSubList: null,
          chainFilter: null,
          contractFilter: null,
          eoaBlacklist: null,
          eoaFilter: null,
          revokedTokens: null,
          userIdBlacklist: null,
          userIdFilter: null,
        },
        name: mockDeal.name,
        startTime: null,
        teamId: mockDeal.team_id,
        updatedAt: mockDeal.updated_at,
      })
    })
  })

  it("returns a deal with associated Proxy API data", async () => {
    const mockDeal = createMockDeal()
    const mockList = createMockList()

    ;(proxyApiClient.view as jest.Mock).mockResolvedValue({
      responses: [
        {
          objects: [
            createProxyApiObject(
              `deal::acc::customers::${mockTeam.id}::deals::${mockDeal.id}::enabled`,
              {
                NumberVar: {
                  value: "1",
                },
              },
            ),
          ],
        },
        {
          objects: [
            createProxyApiObject(
              `deal::acc::customers::${mockTeam.id}::deals::${mockDeal.id}::startTime`,
              {
                NumberVar: {
                  value: "1709381221482",
                },
              },
            ),
          ],
        },
        {
          objects: [
            createProxyApiObject(
              `deal::acc::customers::${mockTeam.id}::deals::${mockDeal.id}::endTime`,
              {
                NumberVar: {
                  value: "1719381221482",
                },
              },
            ),
          ],
        },
        {
          objects: [
            createProxyApiObject(
              `deal::acc::customers::${mockTeam.id}::deals::${mockDeal.id}::chainFilter`,
              {
                StringVar: {
                  value: "1",
                },
              },
            ),
          ],
        },
      ],
    })

    mockSupabaseClient
      .from("deals")
      .select.mockImplementation(() => createSelect(mockDeal))

    mockSupabaseClient
      .from("lists")
      .select.mockImplementation(() => createSelect([mockList]))

    const req = new NextRequest(new URL("http://test.com/api/deals"))
    const ctx = createMockApiContext({ params: { id: "1" } })
    const result = await GET(req, ctx)

    expect(result).toEqual({
      createdAt: mockDeal.created_at,
      enabled: true,
      endTime: "2024-06-26T05:53:41.482Z",
      id: mockDeal.id,
      lists: {
        autoSubList: null,
        chainFilter: {
          id: 1,
          name: "Test List",
        },
        contractFilter: null,
        eoaBlacklist: null,
        eoaFilter: null,
        revokedTokens: null,
        userIdBlacklist: null,
        userIdFilter: null,
      },
      name: mockDeal.name,
      startTime: "2024-03-02T12:07:01.482Z",
      teamId: mockDeal.team_id,
      updatedAt: mockDeal.updated_at,
    })
  })
})
