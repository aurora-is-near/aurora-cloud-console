import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { Silo } from "../../../../types/types"
import { abort } from "../../../../utils/abort"
import { getSilos } from "@/actions/admin/silos/get-silos"

export const GET = apiRequestHandler(
  ["silos:read"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const silos = await getSilos(ctx.teamKey)
    const silo = silos.find((silo) => silo.id === Number(ctx.params.id))

    if (!silo) {
      abort(404)
    }

    return NextResponse.json<Silo>(silo)
  },
)
