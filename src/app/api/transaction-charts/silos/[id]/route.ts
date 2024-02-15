import { apiRequestHandler } from "@/utils/api"
import { queryTransactions } from "../../../../../utils/proxy-db/query-transactions"
import { abort } from "../../../../../utils/abort"
import { getTransactionsChart } from "../../../../../utils/transactions"
import { getTeamSilos } from "@/actions/admin/team-silos/get-team-silos"
import { getDealKey } from "@/utils/proxy-api/get-deal-key"
import { SiloTransactionCharts } from "@/types/types"
import { getTeamDeals } from "@/actions/admin/team-deals/get-team-deals"

export const GET = apiRequestHandler<SiloTransactionCharts>(
  ["transactions:read"],
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
        queryTransactions(ctx.team.is_demo_account, [silo.chain_id], {
          interval,
          dealId: await getDealKey(deal.id),
        }),
      ),
    )

    return {
      items: deals.map((deal, dealIndex) => ({
        siloId: silo.id,
        chart: getTransactionsChart(deal.name, results[dealIndex]),
      })),
    }
  },
)
