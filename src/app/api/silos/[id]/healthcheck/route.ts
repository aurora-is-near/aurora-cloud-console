import { createApiEndpoint } from "@/utils/api"
import { abort } from "@/utils/abort"
import { healthcheck } from "@/utils/healthcheck"
import { getTeamSilo } from "@/actions/team-silos/get-team-silo"

export const GET = createApiEndpoint("healthcheck", async (_req, ctx) => {
  const silo = await getTeamSilo(ctx.team.id, Number(ctx.params.id))

  if (!silo) {
    abort(404)
  }

  return healthcheck(silo)
})
