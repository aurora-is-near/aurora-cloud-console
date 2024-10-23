/**
 * @jest-environment node
 */
import { symbol } from "zod"
import { DeploymentStatus } from "@/types/types"
import { POST } from "./route"
import {
  createInsertOrUpdate,
  createSelect,
  mockSupabaseClient,
} from "../../../../../../../test-utils/mock-supabase-client"
import { setupJestOpenApi } from "../../../../../../../test-utils/setup-jest-openapi"
import { invokeApiHandler } from "../../../../../../../test-utils/invoke-api-handler"
import { createMockSilo } from "../../../../../../../test-utils/factories/silo-factory"
import { createMockToken } from "../../../../../../../test-utils/factories/token-factory"

jest.mock("../../../../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

describe("Widget silo token route", () => {
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
        invokeApiHandler("POST", "/api/silos/1/widget/tokens", POST),
      ).rejects.toThrow("Not Found")
    })

    describe("updating by ID", () => {
      it("returns a 404 for a non-existant token", async () => {
        mockSupabaseClient
          .from("silos")
          .select.mockImplementation(() => createSelect(createMockSilo()))

        await expect(async () =>
          invokeApiHandler("POST", "/api/silos/1/widget/tokens", POST, {
            body: { tokenId: 1 },
          }),
        ).rejects.toThrow("Not Found")
      })

      it("returns a 400 if the token is already deployed", async () => {
        const mockToken = createMockToken({
          bridge_deployment_status: "DEPLOYED",
        })

        mockSupabaseClient
          .from("silos")
          .select.mockImplementation(() => createSelect(createMockSilo()))

        mockSupabaseClient
          .from("tokens")
          .select.mockImplementation(() => createSelect(mockToken))

        await expect(async () =>
          invokeApiHandler("POST", "/api/silos/1/widget/tokens", POST, {
            body: { tokenId: mockToken.id },
          }),
        ).rejects.toThrow("Token is already deployed")

        expect(mockSupabaseClient.from("tokens").update).not.toHaveBeenCalled()
      })

      it.each(["NOT_DEPLOYED", "PENDING"] as DeploymentStatus[])(
        "updates a token that is %s",
        async (status) => {
          const mockToken = createMockToken({ id: 42 })
          const selectQueries = createSelect(mockToken)
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
            .select.mockImplementation(() => selectQueries)

          mockSupabaseClient
            .from("tokens")
            .update.mockImplementation(() => updateQueries)

          const res = await invokeApiHandler(
            "POST",
            "/api/silos/1/widget/tokens",
            POST,
            { body: { tokenId: mockToken.id } },
          )

          expect(res).toSatisfyApiSpec()
          expect(res.body).toEqual({
            status: "PENDING",
          })

          expect(
            mockSupabaseClient.from("tokens").select,
          ).toHaveBeenCalledTimes(1)
          expect(mockSupabaseClient.from("tokens").select).toHaveBeenCalledWith(
            "*",
          )
          expect(selectQueries.eq).toHaveBeenCalledTimes(2)
          expect(selectQueries.eq).toHaveBeenCalledWith("id", mockToken.id)
          expect(selectQueries.eq).toHaveBeenCalledWith("silo_id", 1)

          expect(
            mockSupabaseClient.from("tokens").update,
          ).toHaveBeenCalledTimes(1)
          expect(mockSupabaseClient.from("tokens").update).toHaveBeenCalledWith(
            {
              bridge_deployment_status: "PENDING",
            },
          )

          expect(updateQueries.eq).toHaveBeenCalledTimes(1)
          expect(updateQueries.eq).toHaveBeenCalledWith("id", mockToken.id)
        },
      )
    })

    describe("updating by symbol and address", () => {
      it("creates a new token", async () => {
        const mockToken = createMockToken({ id: 42 })
        const insertQueries = createInsertOrUpdate(mockToken)

        insertQueries.select.mockReturnValue(
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
          .select.mockImplementation(() => createSelect())

        mockSupabaseClient
          .from("tokens")
          .insert.mockImplementation(() => insertQueries)

        const res = await invokeApiHandler(
          "POST",
          "/api/silos/1/widget/tokens",
          POST,
          { body: { symbol: mockToken.symbol, address: mockToken.address } },
        )

        expect(res).toSatisfyApiSpec()
        expect(res.body).toEqual({
          status: "PENDING",
        })

        expect(mockSupabaseClient.from("tokens").insert).toHaveBeenCalledTimes(
          1,
        )

        expect(mockSupabaseClient.from("tokens").insert).toHaveBeenCalledWith({
          address: "0x",
          bridge_addresses: [],
          bridge_deployment_status: "PENDING",
          bridge_origin: null,
          decimals: null,
          deployment_status: "PENDING",
          fast_bridge: false,
          icon_url: null,
          name: null,
          silo_id: 1,
          symbol: "TEST",
          type: null,
        })
      })

      it.each(["NOT_DEPLOYED", "PENDING"] as DeploymentStatus[])(
        "updates a token that is %s",
        async (status) => {
          const mockToken = createMockToken({ id: 42 })
          const updateQueries = createInsertOrUpdate(mockToken)

          updateQueries.select.mockReturnValue(
            createSelect({
              ...mockToken,
              bridge_deployment_status: status,
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

          updateQueries.select.mockReturnValue(
            createSelect({
              ...mockToken,
              bridge_deployment_status: "PENDING",
            }),
          )

          const res = await invokeApiHandler(
            "POST",
            "/api/silos/1/widget/tokens",
            POST,
            { body: { symbol: mockToken.symbol, address: mockToken.address } },
          )

          expect(res).toSatisfyApiSpec()
          expect(res.body).toEqual({
            status: "PENDING",
          })

          expect(
            mockSupabaseClient.from("tokens").update,
          ).toHaveBeenCalledTimes(1)
          expect(mockSupabaseClient.from("tokens").update).toHaveBeenCalledWith(
            {
              bridge_deployment_status: "PENDING",
            },
          )

          expect(updateQueries.eq).toHaveBeenCalledTimes(1)
          expect(updateQueries.eq).toHaveBeenCalledWith("id", mockToken.id)
        },
      )

      it("returns a 400 if the token is already deployed", async () => {
        const mockToken = createMockToken({
          bridge_deployment_status: "DEPLOYED",
        })

        mockSupabaseClient
          .from("silos")
          .select.mockImplementation(() => createSelect(createMockSilo()))

        mockSupabaseClient
          .from("tokens")
          .select.mockImplementation(() => createSelect(mockToken))

        await expect(async () =>
          invokeApiHandler("POST", "/api/silos/1/widget/tokens", POST, {
            body: { symbol: mockToken.symbol, address: mockToken.address },
          }),
        ).rejects.toThrow("Token is already deployed")

        expect(mockSupabaseClient.from("tokens").update).not.toHaveBeenCalled()
      })
    })
  })
})
