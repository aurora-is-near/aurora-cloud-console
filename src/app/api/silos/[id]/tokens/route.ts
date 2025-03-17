import { createApiEndpoint } from "@/utils/api"
import { getSilo } from "@/actions/silos/get-silo"
import { getSiloBridgedTokens } from "@/actions/silo-bridged-tokens/get-silo-bridged-tokens"
import { adaptToken } from "@/utils/adapters"
import { abort } from "../../../../../utils/abort"

export const GET = createApiEndpoint(
  "getSiloBridgedTokens",
  async (_req, ctx) => {
    const silo = await getSilo(Number(ctx.params.id))

    if (!silo) {
      abort(404)
    }

    const tokens = await getSiloBridgedTokens(silo.id)

    return {
      total: tokens.length,
      items: tokens.map(adaptToken),
    }
  },
)
