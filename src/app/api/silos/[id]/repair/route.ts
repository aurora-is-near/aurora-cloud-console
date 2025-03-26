import { createApiEndpoint } from "@/utils/api"
import { abort } from "@/utils/abort"
import { repairSilo } from "@/utils/repair"
import { getTeamSilo } from "@/actions/team-silos/get-team-silo"

export const POST = createApiEndpoint("repair", async (_req, ctx) => {
  const silo = await getTeamSilo(ctx.team.id, Number(ctx.params.id))

  if (!silo) {
    abort(404)
  }

  return repairSilo(silo)
})
