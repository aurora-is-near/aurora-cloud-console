import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { Token } from "../../../../../types/types"
import { abort } from "../../../../../utils/abort"
import { getSilo } from "@/actions/admin/silos/get-silo"
import { getSiloTokens } from "@/actions/admin/silo-tokens/get-silo-tokens"

export const GET = apiRequestHandler(
  ["silos:read"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    if (!ctx.teamKey) {
      abort(500, "No team key found")
    }

    const silo = await getSilo(Number(ctx.params.id))

    if (!silo) {
      abort(404)
    }

    const tokens = await getSiloTokens(silo.id)

    return NextResponse.json<Token[]>(tokens)
  },
)
