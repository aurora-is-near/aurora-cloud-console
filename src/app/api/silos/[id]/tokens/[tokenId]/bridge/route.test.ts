/**
 * @jest-environment node
 */
import { POST } from "./route"
import {
  createInsertOrUpdate,
  createSelect,
  mockSupabaseClient,
} from "../../../../../../../../test-utils/mock-supabase-client"
import { setupJestOpenApi } from "../../../../../../../../test-utils/setup-jest-openapi"
import { invokeApiHandler } from "../../../../../../../../test-utils/invoke-api-handler"
import { createMockSilo } from "../../../../../../../../test-utils/factories/silo-factory"
import { createMockToken } from "../../../../../../../../test-utils/factories/token-factory"

jest.mock("../../../../../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

describe("Bridge silo token route", () => {
  beforeAll(setupJestOpenApi)

  beforeEach(() => {
    mockSupabaseClient
      .from("silos")
      .select.mockImplementation(() => createSelect())

    mockSupabaseClient
      .from("tokens")
      .select.mockImplementation(() => createSelect())
  })

  describe("POST", () => {
    it("returns a 404 for a non-existant silo", async () => {
      await expect(async () =>
        invokeApiHandler("POST", "/api/silos/1/tokens/2/bridge", POST),
      ).rejects.toThrow("Not Found")
    })

    it("returns a 404 for a non-existant token", async () => {
      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))

      await expect(async () =>
        invokeApiHandler("POST", "/api/silos/1/tokens/2/bridge", POST),
      ).rejects.toThrow("Not Found")
    })

    it("returns a 400 if the token is already deployed", async () => {
      const mockToken = createMockToken({
        bridge_deployment_status: "DEPLOYED",
      })

      const updateQueries = createInsertOrUpdate(mockToken)

      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))

      mockSupabaseClient
        .from("tokens")
        .select.mockImplementation(() => createSelect(mockToken))

      mockSupabaseClient
        .from("tokens")
        .update.mockImplementation(() => updateQueries)

      await expect(async () =>
        invokeApiHandler("POST", "/api/silos/1/tokens/2/bridge", POST),
      ).rejects.toThrow("Token is already deployed")
    })

    it("updates a token that is not deployed", async () => {
      const mockToken = createMockToken()
      const updateQueries = createInsertOrUpdate(mockToken)

      updateQueries.select.mockReturnValue(
        createSelect({
          ...mockToken,
          bridge_deployment_status: "PENDING",
        }),
      )

      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))

      mockSupabaseClient
        .from("tokens")
        .select.mockImplementation(() => createSelect(mockToken))

      mockSupabaseClient
        .from("tokens")
        .update.mockImplementation(() => updateQueries)

      const res = await invokeApiHandler(
        "POST",
        "/api/silos/1/tokens/2/bridge",
        POST,
      )

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        status: "PENDING",
      })
    })
  })
})
