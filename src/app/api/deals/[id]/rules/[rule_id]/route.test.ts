/**
 * @jest-environment node
 */
import { GET } from "./route"
import {
  createSelect,
  mockSupabaseClient,
} from "../../../../../../../test-utils/mock-supabase-client"
import { setupJestOpenApi } from "../../../../../../../test-utils/setup-jest-openapi"
import { invokeApiHandler } from "../../../../../../../test-utils/invoke-api-handler"
import { createMockUserlist } from "../../../../../../../test-utils/factories/userlist-factory"

jest.mock("../../../../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

describe("Deal rule userlists route", () => {
  beforeAll(setupJestOpenApi)

  beforeEach(() => {
    mockSupabaseClient
      .from("userlists")
      .select.mockImplementation(() => createSelect([]))
  })

  describe("GET", () => {
    it("returns empty items when no userlists exist", async () => {
      const res = await invokeApiHandler(
        "GET",
        "/api/deals/1/rules/1/userlists",
        GET,
        {
          params: { id: "1", rule_id: "1" },
        },
      )

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual([])
    })

    it("returns userlists for a rule", async () => {
      const mockUserlists = [createMockUserlist(), createMockUserlist()]
      const selectQueries = createSelect(mockUserlists)

      mockSupabaseClient
        .from("userlists")
        .select.mockImplementation(() => selectQueries)

      const res = await invokeApiHandler(
        "GET",
        "/api/deals/1/rules/1/userlists",
        GET,
        {
          params: { id: "1", rule_id: "1" },
        },
      )

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual(
        mockUserlists.map((userlist) => ({
          id: userlist.id,
          teamId: userlist.team_id,
          createdAt: userlist.created_at,
          updatedAt: userlist.updated_at,
        })),
      )

      expect(selectQueries.eq).toHaveBeenCalledTimes(1)
      expect(selectQueries.eq).toHaveBeenCalledWith(
        "rules_userlists.rule_id",
        1,
      )
    })
  })
})
