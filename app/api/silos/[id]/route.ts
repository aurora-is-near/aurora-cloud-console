import { NextRequest, NextResponse } from "next/server"
import { getSilos } from "@/mockApi"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { notFound } from "next/navigation"
import { Silo } from "../../../../types/types"

export const GET = apiRequestHandler(
  ["silos:read"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const silos = await getSilos()
    const silo = silos.find((silo) => silo.id === ctx.params.id)

    if (!silo) {
      notFound()
    }

    return NextResponse.json<Silo>(silo)
  },
)
