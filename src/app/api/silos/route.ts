import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { getTeamSilos } from "@/actions/admin/team-silos/get-team-silos"
import { abort } from "@/utils/abort"

export const GET = apiRequestHandler(
  ["silos:read"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    if (!ctx.team.team_key) {
      abort(500, "No team key found")
    }

    const silos = await getTeamSilos(ctx.team.team_key)

    return NextResponse.json(silos)
  },
)
