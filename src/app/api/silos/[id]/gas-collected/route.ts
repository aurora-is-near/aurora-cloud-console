import { createApiEndpoint } from "@/utils/api"
import { getTeamSilo } from "@/actions/team-silos/get-team-silo"
import { queryGasCollected } from "../../../../../utils/proxy-db/query-gas-collected"
import { abort } from "../../../../../utils/abort"

export const GET = createApiEndpoint(
  "getSiloCollectedGas",
  async (req, ctx) => {
    const date = req.nextUrl.searchParams.get("date")
    const silo = await getTeamSilo(ctx.team.id, Number(ctx.params.id))

    if (!silo) {
      abort(404)
    }

    if (!date) {
      abort(400, "Missing date query parameter")
    }

    const result = await queryGasCollected(silo.chain_id, { date })
    const totalGasCollected = result[0].rows[0]?.count ?? 0
    const gasCollectedOverTime = result[1].rows ?? []

    return {
      count: totalGasCollected,
      items: gasCollectedOverTime,
    }
  },
  {
    cache: {
      maxAge: "1h",
      staleWhileRevalidate: "1y",
    },
  },
)
