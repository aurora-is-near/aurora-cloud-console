import { initContract } from "@ts-rest/core"
import { z } from "zod"
import { extendZodWithOpenApi } from "@anatine/zod-openapi"

extendZodWithOpenApi(z)

const c = initContract()

const DealSchema = z.object({
  id: z.number(),
  created_at: z.date(),
  enabled: z.boolean(),
  name: z.string(),
  team_id: z.number(),
})

export const contract = c.router({
  getDeals: {
    summary: "Get all deals",
    method: "GET",
    path: "/api/deals",
    responses: {
      200: z.object({
        deals: DealSchema,
      }),
    },
    metadata: {
      scopes: ["deals:read"],
    },
  },
  getDeal: {
    summary: "Get a single deal",
    method: "GET",
    path: "/api/deals/:id",
    responses: {
      200: DealSchema,
    },
    metadata: {
      scopes: ["deals:read"],
    },
  },
  getDealEnabled: {
    summary: "Check if a deal is enabled",
    method: "GET",
    path: "/api/deals/:id/enabled",
    responses: {
      200: z.object({
        enabled: z.boolean(),
      }),
    },
    metadata: {
      scopes: ["deals:read"],
    },
  },
  updateDealEnabled: {
    summary: "Enable or disable a deal",
    method: "PUT",
    path: "/api/deals/:id/enabled",
    responses: {
      200: z.object({
        enabled: z.boolean(),
      }),
    },
    metadata: {
      scopes: ["deals:write"],
    },
    body: z.object({
      enabled: z.boolean(),
    }),
  },
})
