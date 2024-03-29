import { createApiEndpoint } from "@/utils/api"
import { queryTransactions } from "../../../../../../utils/proxy-db/query-transactions"
import { abort } from "../../../../../../utils/abort"
import { getTransactionData } from "../../../../../../utils/transactions"
import { getTeamSilos } from "@/actions/team-silos/get-team-silos"
import { getDealKey } from "@/utils/proxy-api/get-deal-key"
import { getTeamDeals } from "@/actions/team-deals/get-team-deals"

export const GET = createApiEndpoint(
  "getSiloTransactions",
  async (req, ctx) => {
    const interval = req.nextUrl.searchParams.get("interval")

    const [silos, deals] = await Promise.all([
      getTeamSilos(ctx.team.id),
      getTeamDeals(ctx.team.id),
    ])

    const silo = silos.find((silo) => silo.id === Number(ctx.params.id))

    if (!silo) {
      abort(404)
    }

    const results = await Promise.all(
      deals.map(async (deal) =>
        queryTransactions(ctx.team.transaction_database, [silo.chain_id], {
          interval,
          dealId: await getDealKey(deal.id),
        }),
      ),
    )

    return {
      items: deals.map((deal, dealIndex) => ({
        siloId: silo.id,
        data: getTransactionData(deal.name, results[dealIndex]),
      })),
    }
  },
  {
    cache: {
      maxAge: "1h",
      staleWhileRevalidate: "1y",
    },
  },
)
