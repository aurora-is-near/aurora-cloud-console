import { NextRequest } from "next/server"
import { apiRequestHandler } from "@/utils/api"
import { ApiRequestContext } from "@/types/api"
import { queryTransactions } from "../../../../../utils/proxy-db/query-transactions"
import { abort } from "../../../../../utils/abort"
import { getTransactionsChart } from "../../../../../utils/transactions"
import { getDeals } from "@/utils/proxy-api/get-deals"
import { getTeamSilos } from "@/actions/admin/team-silos/get-team-silos"
import { getDealKey } from "@/utils/proxy-api/get-deal-key"
import { SiloTransactionCharts } from "@/types/types"

export const GET = apiRequestHandler<SiloTransactionCharts>(
  ["transactions:read"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const interval = req.nextUrl.searchParams.get("interval")

    const [silos, deals] = await Promise.all([
      getTeamSilos(ctx.team.team_key),
      getDeals(ctx.team),
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
