import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { Deal } from "../../../../types/types"
import { abort } from "../../../../utils/abort"
import { getDealById } from "@/utils/proxy-api/get-deal-by-id"

export const GET = apiRequestHandler(
  ["deals:read"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const deal = await getDealById(ctx.user, Number(ctx.params.id))

    if (!deal) {
      abort(404)
    }

    return NextResponse.json<Deal>(deal)
  },
)
