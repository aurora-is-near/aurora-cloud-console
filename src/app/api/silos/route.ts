import { createApiEndpoint } from "@/utils/api"
import { getTeamSilos } from "@/actions/admin/team-silos/get-team-silos"
import { adaptSilo } from "@/utils/adapters"

export const GET = createApiEndpoint("getSilos", async (_req, ctx) => {
  const silos = await getTeamSilos(ctx.team.id)

  return {
    items: (silos ?? []).map(adaptSilo),
  }
})
