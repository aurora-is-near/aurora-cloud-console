import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { Deal } from "../../../../../types/types"
import { abort } from "../../../../../utils/abort"
import { getDealById } from "@/utils/proxy-api/get-deal-by-id"
import { toggleDeal } from "@/utils/proxy-api/toggle-deal"

export const PUT = apiRequestHandler(
  ["deals:write"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const deal = await getDealById(ctx.user, Number(ctx.params.id))
    const { enabled } = await req.json()

    if (!deal) {
      abort(404)
    }

    await toggleDeal(ctx.user, deal.id, enabled)

    return NextResponse.json<Deal>(deal)
  },
)
