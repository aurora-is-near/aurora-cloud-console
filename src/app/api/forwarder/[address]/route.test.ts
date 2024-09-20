/**
 * @jest-environment node
 */
import nock from "nock"
import { GET } from "./route"
import { setupJestOpenApi } from "../../../../../test-utils/setup-jest-openapi"
import { invokeApiHandler } from "../../../../../test-utils/invoke-api-handler"

jest.mock("../../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

nock.disableNetConnect()

describe("Forwarder route", () => {
  beforeAll(setupJestOpenApi)

  describe("GET", () => {
    it("returns an existing forwarder address", async () => {
      const address = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
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
        `/api/forwarder/${address}`,
        GET,
        {
          params: { address },
        },
      )

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        forwarderAddress,
      })
    })

    it("returns a 404 for a non-existing forwarder address", async () => {
      const address = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"

      nock("https://forwarder.mainnet.aurora.dev")
        .get("/api/v1/forwarder_contract_params")
        .query(true)
        .reply(200, {
          result: {
            address: null,
            account_created: false,
          },
        })

      await expect(async () =>
        invokeApiHandler("GET", `/api/forwarder/${address}`, GET, {
          params: { address },
        }),
      ).rejects.toThrow("Not Found")
    })

    it("returns a 400 for an invalid address", async () => {
      const address = "0x123"

      await expect(async () =>
        invokeApiHandler("GET", `/api/forwarder/${address}`, GET, {
          params: { address },
        }),
      ).rejects.toThrow("Invalid address")
    })
  })
})
