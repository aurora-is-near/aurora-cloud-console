/**
 * @jest-environment node
 */
import { GET } from "./route"
import {
  createSelect,
  mockSupabaseClient,
} from "../../../../test-utils/mock-supabase-client"
import { createMockDeal } from "../../../../test-utils/factories/deal-factory"
import { proxyApiClient } from "@/utils/proxy-api/client"
import { createProxyApiObject } from "../../../../test-utils/create-proxy-api-object"
import { createMockList } from "../../../../test-utils/factories/list-factory"
import { mockTeam } from "../../../../test-utils/mock-team"
import { setupJestOpenApi } from "../../../../test-utils/setup-jest-openapi"
import { invokeApiHandler } from "../../../../test-utils/invoke-api-handler"

jest.mock("../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

jest.mock("../../../utils/proxy-api/client")

describe("Deals route", () => {
  beforeAll(setupJestOpenApi)

  beforeEach(() => {
    ;(proxyApiClient.view as jest.Mock).mockResolvedValue({ responses: [] })
  })

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
      const res = await invokeApiHandler("GET", "/api/deals", GET)

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        items: [],
      })
    })

    it("returns a deal", async () => {
      const mockDeal = createMockDeal()
      const mockList = createMockList()
      const dealSelectQueries = createSelect([mockDeal])
      const listSelectQueries = createSelect([mockList])

      mockSupabaseClient
        .from("deals")
        .select.mockImplementation(() => dealSelectQueries)

      mockSupabaseClient
        .from("lists")
        .select.mockImplementation(() => listSelectQueries)

      const res = await invokeApiHandler("GET", "/api/deals", GET)

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
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

      expect(dealSelectQueries.eq).toHaveBeenCalledTimes(1)
      expect(dealSelectQueries.eq).toHaveBeenCalledWith("team_id", mockTeam.id)

      expect(listSelectQueries.eq).toHaveBeenCalledTimes(1)
      expect(listSelectQueries.eq).toHaveBeenCalledWith("team_id", mockTeam.id)
    })
  })

  it("returns a deal with associated Proxy API data", async () => {
    const mockDeal = createMockDeal()
    const mockList = createMockList()
    const dealSelectQueries = createSelect([mockDeal])
    const listSelectQueries = createSelect([mockList])

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
      .select.mockImplementation(() => dealSelectQueries)

    mockSupabaseClient
      .from("lists")
      .select.mockImplementation(() => listSelectQueries)

    const res = await invokeApiHandler("GET", "/api/deals", GET)

    expect(res).toSatisfyApiSpec()
    expect(res.body).toEqual({
      items: [
        {
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
        },
      ],
    })

    expect(dealSelectQueries.eq).toHaveBeenCalledTimes(1)
    expect(dealSelectQueries.eq).toHaveBeenCalledWith("team_id", mockTeam.id)

    expect(listSelectQueries.eq).toHaveBeenCalledTimes(1)
    expect(listSelectQueries.eq).toHaveBeenCalledWith("team_id", mockTeam.id)
  })
})
