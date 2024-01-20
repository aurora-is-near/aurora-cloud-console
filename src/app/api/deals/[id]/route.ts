import { NextRequest } from "next/server"
import { ApiRequestContext, createApiEndpoint } from "@/utils/api"
import { abort } from "../../../../utils/abort"
import { getDealById } from "@/utils/proxy-api/get-deal-by-id"

export const GET = createApiEndpoint(
  "getDeal",
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const deal = await getDealById(ctx.team, Number(ctx.params.id))

    if (!deal) {
      abort(404)
    }

    return deal
  },
)
