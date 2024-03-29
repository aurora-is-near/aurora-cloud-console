import { createApiEndpoint } from "@/utils/api"
import { abort } from "../../../../../utils/abort"
import { getSilo } from "@/actions/silos/get-silo"
import { getSiloTokens } from "@/actions/silo-tokens/get-silo-tokens"

export const GET = createApiEndpoint("getSiloTokens", async (_req, ctx) => {
  const silo = await getSilo(Number(ctx.params.id))

  if (!silo) {
    abort(404)
  }

  const tokens = await getSiloTokens(silo.id)

  return {
    items: tokens.map((token) => ({
      address: token.address,
      id: token.id,
      symbol: token.symbol,
      type: token.type,
      createdAt: token.created_at,
    })),
  }
})
