import { NextRequest } from "next/server"
import { ApiRequestContext, createApiEndpoint } from "@/utils/api"
import { getDeals } from "@/utils/proxy-api/get-deals"

export const GET = createApiEndpoint(
  "getDeals",
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    return {
      deals: await getDeals(ctx.team),
    }
  },
)
