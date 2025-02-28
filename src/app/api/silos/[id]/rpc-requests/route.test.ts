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

describe("Silo RPC requests", () => {
  beforeAll(setupJestOpenApi)

  beforeEach(() => {
    mockSupabaseClient
      .from("silos")
      .select.mockImplementation(() => createSelect())
  })

  afterAll(cleanUpNock)

  describe("GET", () => {
    it("returns a 404 for a non-existant silo", async () => {
      const res = await invokeApiHandler(
        "GET",
        "/api/silos/1/rpc-requests",
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
                        'Expr: sum(rate(borealis_prober_entries_count{rpcstatus="error", network="mainnet"}[12h0m15s])) / sum(rate(borealis_prober_entries_count{}[12h0m15s]))\nStep: 12h0m0s',
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
                            'sum(rate(borealis_prober_entries_count{rpcstatus="error", network="mainnet"}[12h0m15s])) / sum(rate(borealis_prober_entries_count{}[12h0m15s]))',
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
                        0.0009710638397629913, 0.0009631684262096024,
                        0.0010321026976661206, 0.00100269424057059,
                        0.0010321026976661206, 0.00100269424057059,
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
        "/api/silos/1/rpc-requests",
        GET,
      )

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        items: [
          {
            chart: [
              {
                count: 0.0009710638397629913,
                day: 1709899200000,
              },
              {
                count: 0.0009631684262096024,
                day: 1709942400000,
              },
              {
                count: 0.0010321026976661206,
                day: 1709985600000,
              },
              {
                count: 0.00100269424057059,
                day: 1710028800000,
              },
              {
                count: 0.0010321026976661206,
                day: 1710072000000,
              },
              {
                count: 0.00100269424057059,
                day: 1710115200000,
              },
            ],
            label: "RPC requests",
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
        "/api/silos/1/rpc-requests",
        GET,
      )

      expect(res).toSatisfyApiSpec()
      expect(res.body).toEqual({
        items: [
          {
            chart: [],
            label: "RPC requests",
          },
        ],
      })
    })
  })
})
