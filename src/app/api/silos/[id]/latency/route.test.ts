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
import { cleanUpNock } from "../../../../../../test-utils/cleanUpNock"

jest.mock("../../../../../utils/api", () => ({
  createApiEndpoint: jest.fn((_name, handler) => handler),
}))

describe("Silo latency", () => {
  beforeAll(setupJestOpenApi)

  beforeEach(() => {
    mockSupabaseClient
      .from("silos")
      .select.mockImplementation(() => createSelect())
  })

  afterAll(cleanUpNock)

  describe("POST", () => {
    it("returns a 404 for a non-existant silo", async () => {
      const res = await invokeApiHandler("GET", "/api/silos/1/latency", GET)

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
                        'Expr: histogram_quantile(0.75, sum by(le) (rate(borealis_prober_entries_request_size_bucket{network="mainnet"}[30m15s])))\nStep: 30m0s',
                    },
                    fields: [
                      {
                        name: "Time",
                        type: "time",
                        typeInfo: { frame: "time.Time" },
                        config: { interval: 1800000 },
                      },
                      {
                        name: "Value",
                        type: "number",
                        typeInfo: { frame: "float64" },
                        labels: {},
                        config: {
                          displayNameFromDS:
                            'histogram_quantile(0.75, sum by(le) (rate(borealis_prober_entries_request_size_bucket{network="mainnet"}[30m15s])))',
                        },
                      },
                    ],
                  },
                  data: {
                    values: [
                      [
                        1717624800000, 1717626600000, 1717628400000,
                        1717630200000, 1717632000000, 1717633800000,
                      ],
                      [
                        418.4412708871831, 418.4556381559104, 418.3584960794998,
                        418.3376711025586, 418.3043593582829, 418.4573536294488,
                      ],
                    ],
                  },
                },
              ],
            },
            "1": {
              status: 200,
              frames: [
                {
                  schema: {
                    refId: "1",
                    meta: {
                      type: "timeseries-multi",
                      typeVersion: [0, 1],
                      custom: { resultType: "matrix" },
                      executedQueryString:
                        'Expr: histogram_quantile(0.95, sum by(le) (rate(borealis_prober_entries_request_size_bucket{network="mainnet"}[30m15s])))\nStep: 30m0s',
                    },
                    fields: [
                      {
                        name: "Time",
                        type: "time",
                        typeInfo: { frame: "time.Time" },
                        config: { interval: 1800000 },
                      },
                      {
                        name: "Value",
                        type: "number",
                        typeInfo: { frame: "float64" },
                        labels: {},
                        config: {
                          displayNameFromDS:
                            'histogram_quantile(0.95, sum by(le) (rate(borealis_prober_entries_request_size_bucket{network="mainnet"}[30m15s])))',
                        },
                      },
                    ],
                  },
                  data: {
                    values: [
                      [
                        1717624800000, 1717626600000, 1717628400000,
                        1717630200000, 1717632000000, 1717633800000,
                      ],
                      [
                        463.80752343500586, 463.8257219753937,
                        463.7026753452737, 463.67629704114813,
                        463.6341021650656, 463.82789490854236,
                      ],
                    ],
                  },
                },
              ],
            },
            "2": {
              status: 200,
              frames: [
                {
                  schema: {
                    refId: "2",
                    meta: {
                      type: "timeseries-multi",
                      typeVersion: [0, 1],
                      custom: { resultType: "matrix" },
                      executedQueryString:
                        'Expr: histogram_quantile(0.99, sum by(le) (rate(borealis_prober_entries_request_size_bucket{network="mainnet"}[30m15s])))\nStep: 30m0s',
                    },
                    fields: [
                      {
                        name: "Time",
                        type: "time",
                        typeInfo: { frame: "time.Time" },
                        config: { interval: 1800000 },
                      },
                      {
                        name: "Value",
                        type: "number",
                        typeInfo: { frame: "float64" },
                        labels: {},
                        config: {
                          displayNameFromDS:
                            'histogram_quantile(0.99, sum by(le) (rate(borealis_prober_entries_request_size_bucket{network="mainnet"}[30m15s])))',
                        },
                      },
                    ],
                  },
                  data: {
                    values: [
                      [
                        1717624800000, 1717626600000, 1717628400000,
                        1717630200000, 1717632000000, 1717633800000,
                      ],
                      [
                        678.3335146390666, 678.6422882706012, 654.2582942445206,
                        648.8652899628224, 640.3553744747571, 680.3441605223212,
                      ],
                    ],
                  },
                },
              ],
            },
          },
        })

      const res = await invokeApiHandler("GET", "/api/silos/1/latency", GET)

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        items: [
          {
            chart: [
              {
                count: 418.4412708871831,
                day: 1717624800000,
              },
              {
                count: 418.4556381559104,
                day: 1717626600000,
              },
              {
                count: 418.3584960794998,
                day: 1717628400000,
              },
              {
                count: 418.3376711025586,
                day: 1717630200000,
              },
              {
                count: 418.3043593582829,
                day: 1717632000000,
              },
              {
                count: 418.4573536294488,
                day: 1717633800000,
              },
            ],
            label: "Latency (ms), 75% quantile",
          },
          {
            chart: [
              {
                count: 463.80752343500586,
                day: 1717624800000,
              },
              {
                count: 463.8257219753937,
                day: 1717626600000,
              },
              {
                count: 463.7026753452737,
                day: 1717628400000,
              },
              {
                count: 463.67629704114813,
                day: 1717630200000,
              },
              {
                count: 463.6341021650656,
                day: 1717632000000,
              },
              {
                count: 463.82789490854236,
                day: 1717633800000,
              },
            ],
            label: "Latency (ms), 95% quantile",
          },
          {
            chart: [
              { count: 678.3335146390666, day: 1717624800000 },
              {
                count: 678.6422882706012,
                day: 1717626600000,
              },
              {
                count: 654.2582942445206,
                day: 1717628400000,
              },
              {
                count: 648.8652899628224,
                day: 1717630200000,
              },
              {
                count: 640.3553744747571,
                day: 1717632000000,
              },
              {
                count: 680.3441605223212,
                day: 1717633800000,
              },
            ],

            label: "Latency (ms), 99% quantile",
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

      const res = await invokeApiHandler("GET", "/api/silos/1/latency", GET)

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        items: [
          {
            chart: [],
            label: "Latency (ms), 75% quantile",
          },
          {
            chart: [],
            label: "Latency (ms), 95% quantile",
          },
          {
            chart: [],
            label: "Latency (ms), 99% quantile",
          },
        ],
      })
    })
  })
})
