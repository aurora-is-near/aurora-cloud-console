/**
 * @jest-environment node
 */
import { proxyApiClient } from "@/utils/proxy-api/client"
import { PUT } from "./route"
import { createMockDeal } from "../../../../../../../test-utils/factories/deal-factory"
import { createMockRule } from "../../../../../../../test-utils/factories/rule-factory"
import { setupJestOpenApi } from "../../../../../../../test-utils/setup-jest-openapi"
import {
  createInsertOrUpdate,
  createSelect,
  mockSupabaseClient,
} from "../../../../../../../test-utils/mock-supabase-client"
import { invokeApiHandler } from "../../../../../../../test-utils/invoke-api-handler"

jest.mock("../../../../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

jest.mock("../../../../../../utils/proxy-api/client")

describe("Deal route", () => {
  beforeAll(setupJestOpenApi)

  describe("PUT", () => {
    it("updates a rule", async () => {
      const mockDeal = createMockDeal()
      const mockRule = createMockRule({ deal_id: mockDeal.id })
      const updateQueries = createInsertOrUpdate(mockRule)

      mockSupabaseClient
        .from("rules")
        .update.mockImplementation(() => updateQueries)

      updateQueries.select.mockReturnValue(
        createSelect({
          ...mockRule,
          resourceDefinition: {
            new_key: "new_value",
          },
        }),
      )

      const res = await invokeApiHandler(
        "PUT",
        `/api/deals/${mockDeal.id}/rules/${mockRule.id}`,
        PUT,
        {
          params: {
            id: String(mockDeal.id),
            rule_id: String(mockRule.id),
          },
          body: {
            resourceDefinition: {
              new_key: "new_value",
            },
          },
        },
      )

      expect(res).toSatisfyApiSpec()

      expect(res.body).toEqual({
        id: mockRule.id,
        dealId: mockRule.deal_id,
        resourceDefinition: {
          new_key: "new_value",
        },
        createdAt: mockRule.created_at,
        updatedAt: mockRule.updated_at,
      })

      expect(updateQueries.eq).toHaveBeenCalledTimes(1)
      expect(updateQueries.eq).toHaveBeenCalledWith("id", mockDeal.id)
    })
  })
})
