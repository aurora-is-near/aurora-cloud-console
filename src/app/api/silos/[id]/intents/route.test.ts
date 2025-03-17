/**
 * @jest-environment node
 */
import { POST } from "./route"
import { setupJestOpenApi } from "../../../../../../test-utils/setup-jest-openapi"
import { invokeApiHandler } from "../../../../../../test-utils/invoke-api-handler"
import { createMockSilo } from "../../../../../../test-utils/factories/silo-factory"
import { createMockTeam } from "../../../../../../test-utils/factories/team-factory"

jest.mock("../../../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

jest.mock("@/actions/silos/get-silo", () => ({
  getSilo: jest.fn(),
}))

jest.mock("@/actions/teams/get-silo-team", () => ({
  getSiloTeam: jest.fn(),
}))

jest.mock("@/actions/silos/request-intents-integration", () => ({
  requestIntentsIntegration: jest.fn(),
}))

describe("Silo intents integration route", () => {
  beforeAll(setupJestOpenApi)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("POST", () => {
    it("returns a 404 for a non-existent silo", async () => {
      const { getSilo } = require("@/actions/silos/get-silo")

      getSilo.mockResolvedValue(null)

      const res = await invokeApiHandler("POST", "/api/silos/1/intents", POST, {
        params: { id: "1" },
      })

      expect(res.status).toBe(404)
      expect(res.body).toEqual({ message: "Silo not found" })
    })

    it("returns a 404 if team not found", async () => {
      const mockSilo = createMockSilo({ id: 1 })

      const { getSilo } = require("@/actions/silos/get-silo")

      getSilo.mockResolvedValue(mockSilo)

      const { getSiloTeam } = require("@/actions/teams/get-silo-team")

      getSiloTeam.mockResolvedValue(null)

      const res = await invokeApiHandler("POST", "/api/silos/1/intents", POST, {
        params: { id: "1" },
      })

      expect(res.status).toBe(404)
      expect(res.body).toEqual({ message: "Team not found" })
    })

    it("requests intents integration and sets status to REQUESTED", async () => {
      const mockSilo = createMockSilo({ id: 1 })
      const mockTeam = createMockTeam({ id: 1 })
      const updatedSilo = {
        ...mockSilo,
        intents_integration_status: "REQUESTED",
      }

      const { getSilo } = require("@/actions/silos/get-silo")

      getSilo.mockResolvedValue(mockSilo)

      const { getSiloTeam } = require("@/actions/teams/get-silo-team")

      getSiloTeam.mockResolvedValue(mockTeam)

      const {
        requestIntentsIntegration,
      } = require("@/actions/silos/request-intents-integration")

      requestIntentsIntegration.mockResolvedValue(updatedSilo)

      const res = await invokeApiHandler("POST", "/api/silos/1/intents", POST, {
        params: { id: "1" },
      })

      expect(res).toSatisfyApiSpec()
      expect(requestIntentsIntegration).toHaveBeenCalledWith(mockTeam, mockSilo)
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty("intentsIntegrationStatus", "REQUESTED")
    })
  })
})
