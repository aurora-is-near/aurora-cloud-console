import { NextRequest, NextResponse } from "next/server"
import { apiRequestHandler } from "@/utils/api"
import { ApiRequestContext } from "@/types/api"
import { DealTransactionCharts } from "../../../../types/types"
import { queryTransactions } from "../../../../utils/proxy-db/query-transactions"
import { getTransactionsChart } from "../../../../utils/transactions"
import { getTeamSilos } from "@/actions/admin/team-silos/get-team-silos"
import { getDealKey } from "@/utils/proxy-api/get-deal-key"
import { getDeals } from "@/actions/admin/deals/get-deals"
import { getTeamDeals } from "@/actions/admin/team-deals/get-team-deals"

export const GET = apiRequestHandler<DealTransactionCharts>(
  ["transactions:read"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const interval = req.nextUrl.searchParams.get("interval")

    const [silos, deals] = await Promise.all([
      getTeamSilos(ctx.team.id),
      getTeamDeals(ctx.team.id),
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
