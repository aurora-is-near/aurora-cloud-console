/**
 * @jest-environment node
 */
import { GET, POST } from "./route"
import {
  createInsertOrUpdate,
  createSelect,
  mockSupabaseClient,
} from "../../../../test-utils/mock-supabase-client"
import {
  createMockList,
  createMockLists,
} from "../../../../test-utils/factories/list-factory"
import { setupJestOpenApi } from "../../../../test-utils/setup-jest-openapi"
import { invokeApiHandler } from "../../../../test-utils/invoke-api-handler"
import { mockTeam } from "../../../../test-utils/mock-team"
import { proxyApiClient } from "@/utils/proxy-api/client"

jest.mock("../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

jest.mock("../../../utils/proxy-api/client")

describe("Lists route", () => {
  beforeAll(setupJestOpenApi)

  describe("GET", () => {
    beforeEach(() => {
      mockSupabaseClient
        .from("lists")
        .select.mockImplementation(() => createSelect([]))
    })

    it("returns empty items", async () => {
      const res = await invokeApiHandler("GET", "/api/lists", GET)

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        items: [],
      })
    })

    it("returns some lists", async () => {
      const mockLists = createMockLists(2)

      mockSupabaseClient
        .from("lists")
        .select.mockImplementation(() => createSelect(mockLists))

      const res = await invokeApiHandler("GET", "/api/lists", GET)

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        items: [
          {
            createdAt: mockLists[0].created_at,
            id: mockLists[0].id,
            name: mockLists[0].name,
          },
          {
            createdAt: mockLists[1].created_at,
            id: mockLists[1].id,
            name: mockLists[1].name,
          },
        ],
      })
    })
  })

  describe("POST", () => {
    beforeEach(() => {
      mockSupabaseClient
        .from("lists")
        .insert.mockImplementation(() => createInsertOrUpdate())
    })

    it("creates a list", async () => {
      const name = "New List"
      const mockList = createMockList({ name })

      mockSupabaseClient
        .from("lists")
        .insert.mockImplementation(() => createInsertOrUpdate(mockList))

      const res = await invokeApiHandler("POST", "/api/lists", POST, {
        body: { name },
      })

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        createdAt: mockList.created_at,
        id: mockList.id,
        name: mockList.name,
      })

      expect(mockSupabaseClient.from("lists").insert).toHaveBeenCalledWith({
        name,
        team_id: mockTeam.id,
      })

      expect(proxyApiClient.update).toHaveBeenCalledTimes(1)
      expect(proxyApiClient.update).toHaveBeenCalledWith([
        {
          op_type: "set",
          template_key: `template::deal::acc::customers::${mockTeam.id}::list`,
          var_key: `deal::acc::customers::${mockTeam.id}::lists::${mockList.id}`,
          var_type: "set",
        },
      ])
    })
  })
})
