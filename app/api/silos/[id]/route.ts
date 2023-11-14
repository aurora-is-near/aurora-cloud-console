import { NextRequest, NextResponse } from "next/server"
import { getSilos } from "@/mockApi"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { Silo } from "../../../../types/types"
import { abort } from "../../../../utils/abort"

export const GET = apiRequestHandler(
  ["silos:read"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const silos = await getSilos()
    const silo = silos.find((silo) => silo.id === ctx.params.id)

    if (!silo) {
      abort(404)
    }

    return NextResponse.json<Silo>(silo)
  },
)
