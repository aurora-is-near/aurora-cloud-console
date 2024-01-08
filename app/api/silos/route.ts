import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { getSilos } from "@/actions/admin/silos/get-silos"

export const GET = apiRequestHandler(
  ["silos:read"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const silos = await getSilos(ctx.teamKey)

    return NextResponse.json(silos)
  },
)
