/**
 * @jest-environment node
 */
import { WidgetNetworkType } from "@/types/types"
import { GET, POST, PUT } from "./route"
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
          "https://aurora-plus-git-cloud-bridge-auroraisnear.vercel.app/cloud?toNetworks=%5B%22ethereum%22%5D&fromNetworks=%5B%22aurora%22%5D",
      })
    })
  })

  describe("POST", () => {
    it("returns a 404 for a non-existant silo", async () => {
      await expect(async () =>
        invokeApiHandler("POST", "/api/silos/1/widget", POST),
      ).rejects.toThrow("Not Found")
    })

    it("returns a 400 if the widget already exists", async () => {
      mockSupabaseClient
        .from("widgets")
        .select.mockImplementation(() => createSelect(createMockWidget()))

      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))

      let error

      try {
        await invokeApiHandler("POST", "/api/silos/1/widget", POST)
      } catch (e) {
        error = e
      }

      expect(error).toBeDefined()
    })

    it("creates a widget", async () => {
      const mockWidget = createMockWidget()

      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))

      mockSupabaseClient
        .from("widgets")
        .insert.mockImplementation(() => createInsertOrUpdate(mockWidget))

      const res = await invokeApiHandler("POST", "/api/silos/1/widget", POST, {
        body: {},
      })

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        enabled: true,
        createdAt: mockWidget.created_at,
        updatedAt: mockWidget.updated_at,
        fromNetworks: [],
        toNetworks: [],
        tokens: [],
        widgetUrl:
          "https://aurora-plus-git-cloud-bridge-auroraisnear.vercel.app/cloud?toNetworks=%5B%5D&fromNetworks=%5B%5D",
      })

      expect(mockSupabaseClient.from("widgets").insert).toHaveBeenCalledWith({
        silo_id: 1,
      })
    })
  })

  describe("PUT", () => {
    it("returns a 404 for a non-existant silo", async () => {
      await expect(async () =>
        invokeApiHandler("PUT", "/api/silos/1/widget", POST),
      ).rejects.toThrow("Not Found")
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
        .update.mockImplementation(() => updateQueries)

      mockSupabaseClient
        .from("widgets")
        .select.mockImplementation(() => createSelect(mockWidget))

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
          "https://aurora-plus-git-cloud-bridge-auroraisnear.vercel.app/cloud?toNetworks=%5B%22ethereum%22%5D&fromNetworks=%5B%22aurora%22%5D",
      })

      expect(mockSupabaseClient.from("widgets").update).toHaveBeenCalledTimes(1)
      expect(mockSupabaseClient.from("widgets").update).toHaveBeenCalledWith({
        from_networks: fromNetworks,
        to_networks: toNetworks,
        tokens,
      })

      expect(updateQueries.eq).toHaveBeenCalledWith("silo_id", 1)
    })
  })
})
