import { createApiEndpoint } from "@/utils/api"
import { abort } from "../../../../../utils/abort"
import { getTeamSilo } from "@/actions/team-silos/get-team-silo"
import { adaptSilo } from "@/utils/adapters"

export const GET = createApiEndpoint("getSilo", async (_req, ctx) => {
  const silo = await getTeamSilo(ctx.team.id, Number(ctx.params.id))

  if (!silo) {
    abort(404)
  }

  return adaptSilo(silo)
})
