import { createApiEndpoint } from "@/utils/api"
import { getTeamSilo } from "@/actions/team-silos/get-team-silo"
import { adaptSilo } from "@/utils/adapters"
import { abort } from "../../../../utils/abort"

export const GET = createApiEndpoint("getSilo", async (_req, ctx) => {
  const silo = await getTeamSilo(ctx.team.id, Number(ctx.params.id))

  if (!silo) {
    abort(404)
  }

  return adaptSilo(silo)
})
