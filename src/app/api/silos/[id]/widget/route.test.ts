/**
 * @jest-environment node
 */
import { WidgetNetworkType } from "@/types/types"
import { GET, PUT } from "./route"
import {
  createInsertOrUpdate,
  createSelect,
  mockSupabaseClient,
} from "../../../../../../test-utils/mock-supabase-client"
import { setupJestOpenApi } from "../../../../../../test-utils/setup-jest-openapi"
import { invokeApiHandler } from "../../../../../../test-utils/invoke-api-handler"
import { createMockSilo } from "../../../../../../test-utils/factories/silo-factory"
import { createMockWidget } from "../../../../../../test-utils/factories/widget-factory"

jest.mock("../../../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

describe("Widgets route", () => {
  beforeAll(setupJestOpenApi)

  beforeEach(() => {
    mockSupabaseClient
      .from("silos")
      .select.mockImplementation(() => createSelect())

    mockSupabaseClient
      .from("widgets")
      .select.mockImplementation(() => createSelect())
  })

  describe("GET", () => {
    it("returns a disabled widget", async () => {
      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))

      const res = await invokeApiHandler("GET", "/api/silos/1/widget", GET)

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        enabled: false,
        createdAt: null,
        updatedAt: null,
        fromNetworks: null,
        toNetworks: null,
        tokens: [],
        widgetUrl: null,
      })
    })

    it("returns an enabled widget", async () => {
      const mockWidget = createMockWidget({
        from_networks: ["AURORA"],
        to_networks: ["ETHEREUM"],
        tokens: [1],
      })

      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))

      mockSupabaseClient
        .from("widgets")
        .select.mockImplementation(() => createSelect(mockWidget))

      const res = await invokeApiHandler("GET", "/api/silos/1/widget", GET)

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        enabled: true,
        createdAt: mockWidget.created_at,
        updatedAt: mockWidget.updated_at,
        fromNetworks: ["AURORA"],
        toNetworks: ["ETHEREUM"],
        tokens: [1],
        widgetUrl:
          "https://aurora.plus/cloud?toNetworks=%5B%22ethereum%22%5D&fromNetworks=%5B%22aurora%22%5D",
      })
    })
  })

  describe("PUT", () => {
    it("returns a 404 for a non-existant silo", async () => {
      const res = await invokeApiHandler("PUT", "/api/silos/1/widget", PUT)

      expect(res.status).toBe(404)
      expect(res.body).toEqual({ message: "Not Found" })
    })

    it("updates a widget", async () => {
      const mockSilo = createMockSilo()
      const mockWidget = createMockWidget()
      const updateQueries = createInsertOrUpdate(mockWidget)
      const fromNetworks: WidgetNetworkType[] = ["AURORA"]
      const toNetworks: WidgetNetworkType[] = ["ETHEREUM"]
      const tokens = [1]

      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(mockSilo))

      mockSupabaseClient
        .from("widgets")
        .upsert.mockImplementation(() => updateQueries)

      updateQueries.select.mockReturnValue(
        createSelect({
          ...mockWidget,
          from_networks: fromNetworks,
          to_networks: toNetworks,
          tokens,
        }),
      )

      const res = await invokeApiHandler(
        "PUT",
        `/api/silos/${mockSilo.id}/widget`,
        PUT,
        {
          params: { id: String(mockSilo.id) },
          body: {
            fromNetworks,
            toNetworks,
            tokens,
          },
        },
      )

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        enabled: true,
        createdAt: mockWidget.created_at,
        updatedAt: mockWidget.updated_at,
        fromNetworks,
        toNetworks,
        tokens,
        widgetUrl:
          "https://aurora.plus/cloud?toNetworks=%5B%22ethereum%22%5D&fromNetworks=%5B%22aurora%22%5D",
      })

      expect(mockSupabaseClient.from("widgets").upsert).toHaveBeenCalledTimes(1)
      expect(mockSupabaseClient.from("widgets").upsert).toHaveBeenCalledWith(
        {
          silo_id: mockSilo.id,
          from_networks: fromNetworks,
          to_networks: toNetworks,
          tokens,
        },
        { onConflict: "silo_id" },
      )
    })
  })
})
