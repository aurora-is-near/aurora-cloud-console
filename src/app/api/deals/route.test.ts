/**
 * @jest-environment node
 */
import { NextRequest } from "next/server"
import { GET } from "./route"
import { createMockApiContext } from "../../../../test-utils/create-mock-api-context"
import {
  createSelect,
  mockSupabaseClient,
} from "../../../../test-utils/mock-supabase-client"
import { createMockDeal } from "../../../../test-utils/mock-deal"
import { List } from "@/types/types"
import { proxyApiClient } from "@/utils/proxy-api/client"
import { createProxyApiObject } from "../../../../test-utils/create-proxy-api-object"

jest.mock("../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

jest.mock("../../../utils/proxy-api/client", () => ({
  proxyApiClient: {
    view: jest.fn(async () => ({ responses: [] })),
    update: jest.fn(),
  },
}))

describe("Deals route", () => {
  describe("GET", () => {
    beforeEach(() => {
      mockSupabaseClient
        .from("deals")
        .select.mockImplementation(() => createSelect([]))

      mockSupabaseClient
        .from("lists")
        .select.mockImplementation(() => createSelect([]))
    })

    it("returns an empty deals list", async () => {
      const req = new NextRequest(new URL(`http://test.com/api/deals`))
      const ctx = createMockApiContext()
      const result = await GET(req, ctx)

      expect(result).toEqual({
        items: [],
      })
    })

    it("returns a basic deal", async () => {
      const mockDeal = createMockDeal()

      mockSupabaseClient
        .from("deals")
        .select.mockImplementation(() => createSelect([mockDeal]))

      const req = new NextRequest(new URL(`http://test.com/api/deals`))
      const ctx = createMockApiContext()
      const result = await GET(req, ctx)

      expect(result).toEqual({
        items: [
          {
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
          },
        ],
      })
    })
  })

  it("returns a deal with associated Proxy API data", async () => {
    const mockDeal = createMockDeal()
    const mockLists: List[] = [
      {
        id: 1,
        name: "Test List",
        team_id: 1,
        created_at: "2021-01-01T00:00:00Z",
      },
    ]

    ;(proxyApiClient.view as jest.Mock).mockResolvedValue({
      responses: [
        {
          objects: [
            createProxyApiObject("deal::acc::customers::1::deals::1::enabled", {
              NumberVar: {
                value: "1",
              },
            }),
          ],
        },
        {
          objects: [
            createProxyApiObject(
              "deal::acc::customers::1::deals::1::startTime",
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
              "deal::acc::customers::1::deals::1::chainFilter",
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
      .select.mockImplementation(() => createSelect([mockDeal]))

    mockSupabaseClient
      .from("lists")
      .select.mockImplementation(() => createSelect(mockLists))

    const req = new NextRequest(new URL("http://test.com/api/deals"))
    const ctx = createMockApiContext()
    const result = await GET(req, ctx)

    expect(result).toEqual({
      items: [
        {
          createdAt: mockDeal.created_at,
          enabled: true,
          endTime: null,
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
        },
      ],
    })
  })
})
