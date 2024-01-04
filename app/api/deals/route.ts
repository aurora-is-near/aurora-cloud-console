import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { Deals } from "../../../types/types"
import { getDeals } from "@/utils/proxy-api/get-deals"

export const GET = apiRequestHandler(
  ["deals:read"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    return NextResponse.json<Deals>({
      deals: await getDeals(ctx.teamKey),
    })
  },
)
