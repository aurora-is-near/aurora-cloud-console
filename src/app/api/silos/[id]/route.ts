import { NextRequest, NextResponse } from "next/server"
import { apiRequestHandler } from "@/utils/api"
import { ApiRequestContext } from "@/types/api"
import { Silo } from "../../../../types/types"
import { abort } from "../../../../utils/abort"
import { getTeamSilos } from "@/actions/admin/team-silos/get-team-silos"

export const GET = apiRequestHandler<Silo>(
  ["silos:read"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const silos = await getTeamSilos(ctx.team.id)
    const silo = silos.find((silo) => silo.id === Number(ctx.params.id))

    if (!silo) {
      abort(404)
    }

    return silo
  },
)
