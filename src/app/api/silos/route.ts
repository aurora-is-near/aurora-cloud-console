import { NextRequest } from "next/server"
import { apiRequestHandler } from "@/utils/api"
import { ApiRequestContext } from "@/types/api"
import { getTeamSilos } from "@/actions/admin/team-silos/get-team-silos"

export const GET = apiRequestHandler(
  ["silos:read"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const silos = await getTeamSilos(ctx.team.id)

    return silos
  },
)
