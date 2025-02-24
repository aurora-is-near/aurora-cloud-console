/**
 * @jest-environment node
 */
import nock from "nock"
import { GET } from "./route"
import { setupJestOpenApi } from "../../../../../../../../test-utils/setup-jest-openapi"
import { invokeApiHandler } from "../../../../../../../../test-utils/invoke-api-handler"
import {
  createSelect,
  mockSupabaseClient,
} from "../../../../../../../../test-utils/mock-supabase-client"
import { createMockSilo } from "../../../../../../../../test-utils/factories/silo-factory"

jest.mock("../../../../../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

const mockSilo = createMockSilo()

nock.disableNetConnect()

describe("Forwarder contract route", () => {
  beforeAll(setupJestOpenApi)

  beforeEach(() => {
    mockSupabaseClient
      .from("silos")
      .select.mockImplementation(() => createSelect(mockSilo))
  })

  describe("GET", () => {
    it("returns an existing forwarder address", async () => {
      const targetAddress = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
      const forwarderAddress = "0xc0ffee254729296a45a3885639AC7E10F9d54979"

      nock("https://forwarder.mainnet.aurora.dev")
        .get("/api/v1/forwarder_contract_params")
        .query(true)
        .reply(200, {
          result: {
            address: forwarderAddress,
            account_created: true,
          },
        })

      const res = await invokeApiHandler(
        "GET",
        `/api/silos/1/forwarder/contract/${targetAddress}`,
        GET,
        {
          params: { targetAddress },
        },
      )

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        forwarderAddress,
      })
    })

    it("returns a 404 for a non-existing forwarder address", async () => {
      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))

      const targetAddress = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"

      nock("https://forwarder.mainnet.aurora.dev")
        .get("/api/v1/forwarder_contract_params")
        .query(true)
        .reply(200, {
          result: {
            address: null,
            account_created: false,
          },
        })

      const res = await invokeApiHandler(
        "GET",
        `/api/silos/1/forwarder/contract/${targetAddress}`,
        GET,
        {
          params: { targetAddress },
        },
      )

      expect(res.status).toBe(404)
      expect(res.body).toEqual({
        message: "Not Found",
      })
    })

    it("returns a 400 for an invalid address", async () => {
      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))

      const targetAddress = "0x123"

      const res = await invokeApiHandler(
        "GET",
        `/api/silos/1/forwarder/contract/${targetAddress}`,
        GET,
        {
          params: { targetAddress },
        },
      )

      expect(res.status).toBe(400)
      expect(res.body).toEqual({
        message: "Invalid address",
      })
    })

    it("returns a 404 for a non-existant silo", async () => {
      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect())

      const targetAddress = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
      const res = await invokeApiHandler(
        "GET",
        `/api/silos/1/forwarder/contract/${targetAddress}`,
        GET,
      )

      expect(res.status).toBe(404)
      expect(res.body).toEqual({ message: "Not Found" })
    })
  })
})
