import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { Silo } from "../../../../types/types"
import { abort } from "../../../../utils/abort"
import { getTeamSilos } from "@/actions/admin/team-silos/get-team-silos"

export const GET = apiRequestHandler(
  ["silos:read"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    if (!ctx.teamKey) {
      abort(500, "No team key found")
    }

    const silos = await getTeamSilos(ctx.teamKey)
    const silo = silos.find((silo) => silo.id === Number(ctx.params.id))

    if (!silo) {
      abort(404)
    }

    return NextResponse.json<Silo>(silo)
  },
)
