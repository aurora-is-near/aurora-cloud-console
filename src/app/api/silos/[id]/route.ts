import { createApiEndpoint } from "@/utils/api"
import { getTeamSilo } from "@/actions/team-silos/get-team-silo"
import { adaptSilo } from "@/utils/adapters"
import { getToken } from "@/actions/tokens/get-token"
import { abort } from "../../../../utils/abort"

export const GET = createApiEndpoint("getSilo", async (_req, ctx) => {
  const silo = await getTeamSilo(ctx.team.id, Number(ctx.params.id))
  const token = silo?.base_token_id
    ? await getToken(silo?.base_token_id)
    : undefined

  if (!silo) {
    abort(404)
  }

  return adaptSilo(silo, token)
})
