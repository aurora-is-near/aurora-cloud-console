/**
 * @jest-environment node
 */
import { GET, POST } from "./route"
import {
  createInsertOrUpdate,
  createSelect,
  mockSupabaseClient,
} from "../../../../../../test-utils/mock-supabase-client"
import { createMockRule } from "../../../../../../test-utils/factories/rule-factory"
import { setupJestOpenApi } from "../../../../../../test-utils/setup-jest-openapi"
import { invokeApiHandler } from "../../../../../../test-utils/invoke-api-handler"
import { createMockDeal } from "../../../../../../test-utils/factories/deal-factory"
import { createMockUserlist } from "../../../../../../test-utils/factories/userlist-factory"

jest.mock("../../../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

jest.mock("../../../../../utils/proxy-api/client")

describe("Deal Rules route", () => {
  beforeAll(setupJestOpenApi)

  describe("GET", () => {
    beforeEach(() => {
      mockSupabaseClient
        .from("rules")
        .select.mockImplementation(() => createSelect([]))
    })

    it("returns an empty rules list", async () => {
      const mockDeal = createMockDeal()
      const res = await invokeApiHandler("GET", "/api/deals/1/rules", GET, {
        params: { id: String(mockDeal.id) },
      })

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        items: [],
      })
    })

    it("returns rules for a deal", async () => {
      const mockDeal = createMockDeal()
      const mockRule = createMockRule()
      const ruleSelectQueries = createSelect([mockRule])

      mockSupabaseClient
        .from("rules")
        .select.mockImplementation(() => ruleSelectQueries)

      const res = await invokeApiHandler("GET", "/api/deals/1/rules", GET, {
        params: { id: String(mockDeal.id) },
      })

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        items: [
          {
            id: mockRule.id,
            dealId: mockRule.deal_id,
            resourceDefinition: mockRule.resource_definition,
            createdAt: mockRule.created_at,
            updatedAt: mockRule.updated_at,
          },
        ],
      })

      expect(ruleSelectQueries.eq).toHaveBeenCalledTimes(1)
      expect(ruleSelectQueries.eq).toHaveBeenCalledWith("deal_id", mockDeal.id)
    })
  })

  describe("POST", () => {
    it("creates a rule", async () => {
      const mockDeal = createMockDeal()
      const mockRule = createMockRule()
      const mockUserlist = createMockUserlist()
      const ruleInsertQueries = createInsertOrUpdate(mockRule)
      const userlistInsertQueries = createInsertOrUpdate(mockUserlist)
      const ruleUserlistInsertQueries = createInsertOrUpdate({
        rule_id: mockRule.id,
        userlist_id: mockUserlist.id,
      })

      mockSupabaseClient
        .from("rules")
        .insert.mockImplementation(() => ruleInsertQueries)

      mockSupabaseClient
        .from("userlists")
        .insert.mockImplementation(() => userlistInsertQueries)

      mockSupabaseClient
        .from("rules_userlists")
        .insert.mockImplementation(() => ruleUserlistInsertQueries)

      const res = await invokeApiHandler("POST", "/api/deals/1/rules", POST, {
        params: { id: String(mockDeal.id), teamId: String(mockDeal.team_id) },
        body: { resourceDefinition: mockRule.resource_definition },
      })

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        id: mockRule.id,
        dealId: mockRule.deal_id,
        resourceDefinition: mockRule.resource_definition,
        createdAt: mockRule.created_at,
        updatedAt: mockRule.updated_at,
      })
    })
  })
})
