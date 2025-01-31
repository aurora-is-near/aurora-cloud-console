/**
 * @jest-environment node
 */
import nock from "nock"
import { GET } from "./route"
import {
  createSelect,
  mockSupabaseClient,
} from "../../../../../../test-utils/mock-supabase-client"
import { setupJestOpenApi } from "../../../../../../test-utils/setup-jest-openapi"
import { invokeApiHandler } from "../../../../../../test-utils/invoke-api-handler"
import { createMockSilo } from "../../../../../../test-utils/factories/silo-factory"

jest.mock("../../../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

describe("Silo failure rate", () => {
  beforeAll(setupJestOpenApi)

  beforeEach(() => {
    mockSupabaseClient
      .from("silos")
      .select.mockImplementation(() => createSelect())
  })

  describe("POST", () => {
    it("returns a 404 for a non-existant silo", async () => {
      const res = await invokeApiHandler(
        "GET",
        "/api/silos/1/failure-rate",
        GET,
      )

      expect(res.status).toBe(404)
      expect(res.body).toEqual({ message: "Not Found" })
    })

    it("returns the chart data", async () => {
      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))

      nock("https://grafana.aurora.dev")
        .post("/api/ds/query")
        .reply(200, {
          results: {
            "0": {
              status: 200,
              frames: [
                {
                  schema: {
                    refId: "0",
                    meta: {
                      type: "timeseries-multi",
                      typeVersion: [0, 1],
                      custom: { resultType: "matrix" },
                      executedQueryString:
                        'Expr: sum(rate(borealis_prober_entries_count{network="mainnet"}[12h0m15s]))\nStep: 12h0m0s',
                    },
                    fields: [
                      {
                        name: "Time",
                        type: "time",
                        typeInfo: { frame: "time.Time" },
                        config: { interval: 43200000 },
                      },
                      {
                        name: "Value",
                        type: "number",
                        typeInfo: { frame: "float64" },
                        labels: {},
                        config: {
                          displayNameFromDS:
                            'sum(rate(borealis_prober_entries_count{network="mainnet"}[12h0m15s]))',
                        },
                      },
                    ],
                  },
                  data: {
                    values: [
                      [
                        1709899200000, 1709942400000, 1709985600000,
                        1710028800000, 1710072000000, 1710115200000,
                      ],
                      [
                        9402.22636574074, 9349.135023148141, 9382.926273148145,
                        9249.754861111109, 9742.905231481476, 9433.913217592582,
                      ],
                    ],
                  },
                },
              ],
            },
          },
        })

      const res = await invokeApiHandler(
        "GET",
        "/api/silos/1/failure-rate",
        GET,
      )

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        items: [
          {
            chart: [
              {
                count: 9402.22636574074,
                day: 1709899200000,
              },
              {
                count: 9349.135023148141,
                day: 1709942400000,
              },
              {
                count: 9382.926273148145,
                day: 1709985600000,
              },
              {
                count: 9249.754861111109,
                day: 1710028800000,
              },
              {
                count: 9742.905231481476,
                day: 1710072000000,
              },
              {
                count: 9433.913217592582,
                day: 1710115200000,
              },
            ],
            label: "Failure rate",
          },
        ],
      })
    })

    it("returns the chart data when no results", async () => {
      mockSupabaseClient
        .from("silos")
        .select.mockImplementation(() => createSelect(createMockSilo()))

      nock("https://grafana.aurora.dev").post("/api/ds/query").reply(200, {
        results: {},
      })

      const res = await invokeApiHandler(
        "GET",
        "/api/silos/1/failure-rate",
        GET,
      )

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        items: [
          {
            chart: [],
            label: "Failure rate",
          },
        ],
      })
    })
  })
})
