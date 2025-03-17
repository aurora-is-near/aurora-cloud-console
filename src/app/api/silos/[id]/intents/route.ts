import { createApiEndpoint } from "@/utils/api"
import { requestIntentsIntegration } from "@/actions/silos/request-intents-integration"
import { getSilo } from "@/actions/silos/get-silo"
import { abort } from "@/utils/abort"
import { getSiloTeam } from "@/actions/teams/get-silo-team"
import { adaptSilo } from "@/utils/adapters"

export const POST = createApiEndpoint(
  "requestIntentsIntegration",
  async (req, ctx) => {
    const silo = await getSilo(Number(ctx.params.id))

    if (!silo) {
      abort(404, "Silo not found")
    }

    const team = await getSiloTeam(Number(ctx.params.id))

    if (!team) {
      abort(404, "Team not found")
    }

    const requestedSilo = await requestIntentsIntegration(team, silo)

    return adaptSilo(requestedSilo)
  },
)
