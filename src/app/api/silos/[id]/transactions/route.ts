import { createApiEndpoint } from "@/utils/api"
import { getTeamSilo } from "@/actions/team-silos/get-team-silo"
import { queryTransactions } from "../../../../../utils/proxy-db/query-transactions"
import { abort } from "../../../../../utils/abort"
import { getTransactionData } from "../../../../../utils/transactions"

export const GET = createApiEndpoint(
  "getSiloTransactions",
  async (req, ctx) => {
    const interval = req.nextUrl.searchParams.get("interval")

    const silo = await getTeamSilo(ctx.team.id, Number(ctx.params.id))

    if (!silo) {
      abort(404)
    }

    const results = await queryTransactions(silo.chain_id, {
      interval,
    })

    return {
      items: [
        {
          siloId: silo.id,
          data: getTransactionData(silo.name, results),
        },
      ],
    }
  },
  {
    cache: {
      maxAge: "1h",
      staleWhileRevalidate: "1y",
    },
  },
)
