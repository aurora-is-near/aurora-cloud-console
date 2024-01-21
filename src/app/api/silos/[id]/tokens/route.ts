import { NextRequest } from "next/server"
import { apiRequestHandler } from "@/utils/api"
import { ApiRequestContext } from "@/types/api"
import { Token } from "../../../../../types/types"
import { abort } from "../../../../../utils/abort"
import { getSilo } from "@/actions/admin/silos/get-silo"
import { getSiloTokens } from "@/actions/admin/silo-tokens/get-silo-tokens"

export const GET = apiRequestHandler<Token[]>(
  ["silos:read"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const silo = await getSilo(Number(ctx.params.id))

    if (!silo) {
      abort(404)
    }

    const tokens = await getSiloTokens(silo.id)

    return tokens
  },
)
