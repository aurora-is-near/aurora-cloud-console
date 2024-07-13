import { createApiEndpoint } from "@/utils/api"
import { getTeamSilos } from "@/actions/team-silos/get-team-silos"
import { adaptSilo } from "@/utils/adapters"
import { getTokens } from "@/actions/tokens/get-tokens"

export const GET = createApiEndpoint("getSilos", async (_req, ctx) => {
  const [silos, tokens] = await Promise.all([
    getTeamSilos(ctx.team.id),
    getTokens(),
  ])

  return {
    items: (silos ?? []).map((silo) => {
      const token = tokens.find(({ id }) => id === silo.base_token_id)

      return adaptSilo(silo, token)
    }),
  }
})
