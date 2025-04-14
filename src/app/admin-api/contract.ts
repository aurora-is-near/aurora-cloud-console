import { initContract } from "@ts-rest/core"
import { z } from "zod"
import { extendZodWithOpenApi } from "@anatine/zod-openapi"

extendZodWithOpenApi(z)

const c = initContract()

export const contract = c.router({
  getDeals: {
    summary: "Get all deals",
    method: "GET",
    path: "/admin-api/deals",
    responses: {
      200: z.object({
        items: z.array(
          z.object({
            id: z.number(),
            createdAt: z.string(),
            updatedAt: z.string().nullable(),
            deletedAt: z.string().nullable(),
            name: z.string(),
            teamId: z.number(),
            siloId: z.number().nullable(),
            enabled: z.boolean(),
            open: z.boolean(),
            startTime: z.string().nullable(),
            endTime: z.string().nullable(),
          }),
        ),
      }),
    },
    query: z.object({
      limit: z.number().optional(),
      offset: z.number().optional(),
    }),
  },
})
