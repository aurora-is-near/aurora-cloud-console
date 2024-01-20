import { NextRequest } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { getTeamSilos } from "@/actions/admin/team-silos/get-team-silos"

export const GET = apiRequestHandler(
  ["silos:read"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const silos = await getTeamSilos(ctx.team.team_key)

    return silos
  },
)
