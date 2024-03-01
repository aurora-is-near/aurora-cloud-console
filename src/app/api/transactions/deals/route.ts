import { createApiEndpoint } from "@/utils/api"
import { queryTransactions } from "../../../../utils/proxy-db/query-transactions"
import { getTransactionData } from "../../../../utils/transactions"
import { getTeamSilos } from "@/actions/team-silos/get-team-silos"
import { getDealKey } from "@/utils/proxy-api/get-deal-key"
import { getTeamDeals } from "@/actions/team-deals/get-team-deals"

export const GET = createApiEndpoint(
  "getDealsTransactions",
  async (req, ctx) => {
    const interval = req.nextUrl.searchParams.get("interval")

    const [silos, deals] = await Promise.all([
      getTeamSilos(ctx.team.id),
      getTeamDeals(ctx.team.id),
    ])

    const chainIds = silos.map((silo) => silo.chain_id)

    const results = await Promise.all(
      deals.map(async (deal) =>
        queryTransactions(ctx.team.transaction_database, chainIds, {
          interval,
          dealId: await getDealKey(deal.id),
        }),
      ),
    )

    return {
      items: deals.map((deal, dealIndex) => ({
        dealId: deal.id,
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
