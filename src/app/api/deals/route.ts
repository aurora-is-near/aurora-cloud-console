import { NextRequest } from "next/server"
import { createApiEndpoint } from "@/utils/api"
import { getDeals } from "@/utils/proxy-api/get-deals"
import { ApiRequestContext } from "@/types/api"

export const GET = createApiEndpoint(
  "getDeals",
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    return {
      deals: await getDeals(ctx.team),
    }
  },
)
