/**
 * @jest-environment node
 */
import { proxyApiClient } from "@/utils/proxy-api/client"
import { GET, PUT } from "./route"
import {
  createSelect,
  mockSupabaseClient,
} from "../../../../../test-utils/mock-supabase-client"
import { createMockDeal } from "../../../../../test-utils/factories/deal-factory"
import { createProxyApiObject } from "../../../../../test-utils/create-proxy-api-object"
import {
  createMockList,
  createMockLists,
} from "../../../../../test-utils/factories/list-factory"
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
    beforeEach(() => {
      mockSupabaseClient
        .from("lists")
        .select.mockImplementation(() => createSelect([]))
    })

    it("throws a not found error if no matching deal", async () => {
      await expect(async () =>
        invokeApiHandler("GET", "/api/deals/1", GET),
      ).rejects.toThrow("Not Found")
    })

    it("returns a deal", async () => {
      const mockDeal = createMockDeal()
      const mockLists = createMockLists(4)
      const listSelectQueries = createSelect(mockLists)
      const dealSelectQueries = createSelect(mockDeal)

      mockSupabaseClient
        .from("deals")
        .select.mockImplementation(() => dealSelectQueries)

      mockSupabaseClient
        .from("lists")
        .select.mockImplementation(() => listSelectQueries)

      const res = await invokeApiHandler("GET", "/api/deals/1", GET, {
        params: { id: String(mockDeal.id) },
      })

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
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

      expect(dealSelectQueries.eq).toHaveBeenCalledTimes(2)
      expect(dealSelectQueries.eq).toHaveBeenCalledWith("id", mockDeal.id)
      expect(dealSelectQueries.eq).toHaveBeenCalledWith("team_id", mockTeam.id)

      expect(listSelectQueries.eq).toHaveBeenCalledTimes(1)
      expect(listSelectQueries.eq).toHaveBeenCalledWith("team_id", mockTeam.id)
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

    const res = await invokeApiHandler("GET", "/api/deals/1", GET, {
      params: { id: String(mockDeal.id) },
    })

    expect(res).toSatisfyApiSpec()
    expect(res.body).toEqual({
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

  describe("PUT", () => {
    beforeEach(() => {
      mockSupabaseClient
        .from("lists")
        .select.mockImplementation(() => createSelect([]))
    })

    it("updates a deal", async () => {
      const mockDeal = createMockDeal()
      const mockLists = createMockLists(4)
      const listSelectQueries = createSelect(mockLists)
      const dealSelectQueries = createSelect(mockDeal)

      mockSupabaseClient
        .from("lists")
        .select.mockImplementation(() => listSelectQueries)

      mockSupabaseClient
        .from("deals")
        .select.mockImplementation(() => dealSelectQueries)

      const res = await invokeApiHandler("PUT", "/api/deals/1", PUT, {
        params: {
          id: String(mockDeal.id),
        },
        body: {
          enabled: true,
          startTime: "2024-03-02T12:07:01.482Z",
          endTime: "2024-06-26T05:53:41.482Z",
          chainFilterListId: mockLists[0].id,
          contractFilterListId: mockLists[1].id,
          eoaFilterListId: mockLists[2].id,
          eoaBlacklistListId: mockLists[3].id,
        },
      })

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
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

      expect(proxyApiClient.update).toHaveBeenCalledTimes(1)
      expect(proxyApiClient.update).toHaveBeenCalledWith([
        {
          number_value: 1,
          op_type: "set_value",
          var_key: `deal::acc::customers::${mockTeam.id}::deals::${mockDeal.id}::enabled`,
          var_type: "number",
        },
        {
          op_type: "set",
          template_key: "template::deal::acc::time",
          var_key: `deal::acc::customers::${mockTeam.id}::deals::${mockDeal.id}::startTime`,
          var_type: "number",
        },
        {
          number_value: 1709381221482,
          op_type: "set_value",
          var_key: `deal::acc::customers::${mockTeam.id}::deals::${mockDeal.id}::startTime`,
          var_type: "number",
        },
        {
          op_type: "set",
          template_key: "template::deal::acc::time",
          var_key: `deal::acc::customers::${mockTeam.id}::deals::${mockDeal.id}::endTime`,
          var_type: "number",
        },
        {
          number_value: 1719381221482,
          op_type: "set_value",
          var_key: `deal::acc::customers::${mockTeam.id}::deals::${mockDeal.id}::endTime`,
          var_type: "number",
        },
        {
          op_type: "set_value",
          string_value: String(mockLists[0].id),
          var_key: `deal::acc::customers::${mockTeam.id}::deals::${mockDeal.id}::chainFilter`,
          var_type: "string",
        },
        {
          op_type: "set_value",
          string_value: String(mockLists[1].id),
          var_key: `deal::acc::customers::${mockTeam.id}::deals::${mockDeal.id}::contractFilter`,
          var_type: "string",
        },
        {
          op_type: "set_value",
          string_value: String(mockLists[2].id),
          var_key: `deal::acc::customers::${mockTeam.id}::deals::${mockDeal.id}::eoaFilter`,
          var_type: "string",
        },
        {
          op_type: "set_value",
          string_value: String(mockLists[3].id),
          var_key: `deal::acc::customers::${mockTeam.id}::deals::${mockDeal.id}::eoaBlacklist`,
          var_type: "string",
        },
      ])

      expect(dealSelectQueries.eq).toHaveBeenCalledTimes(2)
      expect(dealSelectQueries.eq).toHaveBeenCalledWith("id", mockDeal.id)
      expect(dealSelectQueries.eq).toHaveBeenCalledWith("team_id", mockTeam.id)

      expect(listSelectQueries.eq).toHaveBeenCalledTimes(1)
      expect(listSelectQueries.eq).toHaveBeenCalledWith("team_id", mockTeam.id)
    })

    it("unsets the lists when no inputs are given", async () => {
      const mockDeal = createMockDeal()

      mockSupabaseClient
        .from("deals")
        .select.mockImplementation(() => createSelect(mockDeal))

      await invokeApiHandler("PUT", "/api/deals/1", PUT, {
        params: { id: String(mockDeal.id) },
        body: {},
      })

      expect(proxyApiClient.update).toHaveBeenCalledTimes(1)
      expect(proxyApiClient.update).toHaveBeenCalledWith([
        {
          op_type: "unset",
          string_value: undefined,
          var_key: `deal::acc::customers::${mockTeam.id}::deals::${mockDeal.id}::chainFilter`,
          var_type: "string",
        },
        {
          op_type: "unset",
          string_value: undefined,
          var_key: `deal::acc::customers::${mockTeam.id}::deals::${mockDeal.id}::contractFilter`,
          var_type: "string",
        },
        {
          op_type: "unset",
          string_value: undefined,
          var_key: `deal::acc::customers::${mockTeam.id}::deals::${mockDeal.id}::eoaFilter`,
          var_type: "string",
        },
        {
          op_type: "unset",
          string_value: undefined,
          var_key: `deal::acc::customers::${mockTeam.id}::deals::${mockDeal.id}::eoaBlacklist`,
          var_type: "string",
        },
      ])
    })
  })
})
