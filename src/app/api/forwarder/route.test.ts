/**
 * @jest-environment node
 */
import nock from "nock"
import { POST } from "./route"
import { setupJestOpenApi } from "../../../../test-utils/setup-jest-openapi"
import { invokeApiHandler } from "../../../../test-utils/invoke-api-handler"

jest.mock("../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

nock.disableNetConnect()

describe("Forwarder route", () => {
  beforeAll(setupJestOpenApi)

  describe("POST", () => {
    it("creates a forwarder address", async () => {
      const address = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
      const forwarderAddress = "0xc0ffee254729296a45a3885639AC7E10F9d54979"

      nock("https://forwarder.mainnet.aurora.dev")
        .post("/api/v1/create_contract", (body) => {
          expect(body).toEqual({
            fees_contract_id: "fees.deposit.aurora",
            target_address: address,
            target_network: "aurora",
          })

          return true
        })
        .reply(200, {
          result: {
            address: forwarderAddress,
            account_created: true,
          },
        })

      const res = await invokeApiHandler("POST", "/api/forwarder", POST, {
        body: { address },
      })

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        forwarderAddress,
      })
    })

    it("returns a 400 for an invalid address", async () => {
      await expect(async () =>
        invokeApiHandler("POST", "/api/forwarder", POST),
      ).rejects.toThrow("Invalid address")
    })
  })
})
