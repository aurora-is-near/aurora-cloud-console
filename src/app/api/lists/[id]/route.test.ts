/**
 * @jest-environment node
 */
import { proxyApiClient } from "@/utils/proxy-api/client"
import { DELETE, GET, PUT } from "./route"
import {
  createDelete,
  createInsertOrUpdate,
  createSelect,
  mockSupabaseClient,
} from "../../../../../test-utils/mock-supabase-client"
import { createMockList } from "../../../../../test-utils/factories/list-factory"
import { setupJestOpenApi } from "../../../../../test-utils/setup-jest-openapi"
import { invokeApiHandler } from "../../../../../test-utils/invoke-api-handler"
import { mockTeam } from "../../../../../test-utils/mock-team"
import { createProxyApiObject } from "../../../../../test-utils/create-proxy-api-object"

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
        .select.mockImplementation(() => createSelect())
    })

    it("throws a not found error if no matching list", async () => {
      await expect(async () =>
        invokeApiHandler("GET", "/api/lists/1", GET),
      ).rejects.toThrow("Not Found")
    })

    it("returns a list", async () => {
      const mockList = createMockList()
      const selectQueries = createSelect(mockList)

      mockSupabaseClient
        .from("lists")
        .select.mockImplementation(() => selectQueries)

      const res = await invokeApiHandler("GET", "/api/lists/1", GET, {
        params: { id: String(mockList.id) },
      })

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        createdAt: mockList.created_at,
        id: mockList.id,
        name: mockList.name,
      })

      expect(selectQueries.eq).toHaveBeenCalledTimes(2)
      expect(selectQueries.eq).toHaveBeenCalledWith("id", mockList.id)
      expect(selectQueries.eq).toHaveBeenCalledWith("team_id", mockTeam.id)
    })
  })

  describe("PUT", () => {
    it("updates a list", async () => {
      const name = "Updated List"
      const mockList = createMockList({ name })
      const putQueries = createInsertOrUpdate(mockList)

      mockSupabaseClient
        .from("lists")
        .update.mockImplementation(() => putQueries)

      const res = await invokeApiHandler("PUT", "/api/lists/1", PUT, {
        params: { id: String(mockList.id) },
        body: { name },
      })

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        createdAt: mockList.created_at,
        id: mockList.id,
        name: mockList.name,
      })

      expect(mockSupabaseClient.from("lists").update).toHaveBeenCalledTimes(1)
      expect(mockSupabaseClient.from("lists").update).toHaveBeenCalledWith({
        name,
      })

      expect(putQueries.eq).toHaveBeenCalledTimes(2)
      expect(putQueries.eq).toHaveBeenCalledWith("id", mockList.id)
      expect(putQueries.eq).toHaveBeenCalledWith("team_id", mockTeam.id)
    })
  })

  describe("DELETE", () => {
    it("deletes a list", async () => {
      const mockList = createMockList()
      const deleteQueries = createDelete()

      mockSupabaseClient
        .from("lists")
        .delete.mockImplementation(() => deleteQueries)
      ;(proxyApiClient.view as jest.Mock).mockResolvedValue({
        responses: [
          {
            objects: [
              createProxyApiObject(
                `deal::acc::customers::${mockTeam.id}::lists::${mockList.id}`,
                { SetVar: { length: 1 } },
              ),
            ],
          },
        ],
      })

      const res = await invokeApiHandler("DELETE", "/api/lists/1", DELETE, {
        params: { id: String(mockList.id) },
      })

      expect(res).toSatisfyApiSpec()
      expect(res.body).toBeNull()

      expect(mockSupabaseClient.from("lists").delete).toHaveBeenCalledTimes(1)
      expect(deleteQueries.eq).toHaveBeenCalledTimes(2)
      expect(deleteQueries.eq).toHaveBeenCalledWith("id", mockList.id)
      expect(deleteQueries.eq).toHaveBeenCalledWith("team_id", mockTeam.id)

      expect(proxyApiClient.update).toHaveBeenCalledTimes(1)
      expect(proxyApiClient.update).toHaveBeenCalledWith([
        {
          op_type: "unset",
          var_key: `deal::acc::customers::${mockTeam.id}::lists::${mockList.id}`,
          var_type: "set",
        },
      ])
    })

    it("does not attempt to delete the list from the proxy api if it does not exist", async () => {
      mockSupabaseClient
        .from("lists")
        .delete.mockImplementation(() => createDelete())

      await invokeApiHandler("DELETE", "/api/lists/1", DELETE, {
        params: { id: "1" },
      })

      expect(proxyApiClient.update).not.toHaveBeenCalled()
    })
  })
})
