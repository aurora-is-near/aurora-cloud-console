import { NextRequest, NextResponse } from "next/server"
import { apiRequestHandler } from "@/utils/api"
import { ApiRequestContext } from "@/types/api"
import { DealTransactionCharts } from "../../../../types/types"
import { queryTransactions } from "../../../../utils/proxy-db/query-transactions"
import { getTransactionsChart } from "../../../../utils/transactions"
import { getDeals } from "@/utils/proxy-api/get-deals"
import { getTeamSilos } from "@/actions/admin/team-silos/get-team-silos"
import { getDealKey } from "@/utils/proxy-api/get-deal-key"

export const GET = apiRequestHandler<DealTransactionCharts>(
  ["transactions:read"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const interval = req.nextUrl.searchParams.get("interval")

    const [silos, deals] = await Promise.all([
      getTeamSilos(ctx.team.team_key),
      getDeals(ctx.team),
    ])

    const chainIds = silos.map((silo) => silo.chain_id)

    const results = await Promise.all(
      deals.map(async (deal) =>
        queryTransactions(ctx.team.is_demo_account, chainIds, {
          interval,
          dealId: await getDealKey(deal.id),
        }),
      ),
    )

    return {
      items: deals.map((deal, dealIndex) => ({
        dealId: deal.id,
        chart: getTransactionsChart(deal.name, results[dealIndex]),
      })),
    }
  },
)
