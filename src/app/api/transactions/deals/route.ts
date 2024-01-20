import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { DealTransactionCharts } from "../../../../types/types"
import { queryTransactions } from "../../../../utils/proxy-db/query-transactions"
import { getTransactionsChart } from "../../../../utils/transactions"
import { getDeals } from "@/utils/proxy-api/get-deals"
import { getTeam } from "@/utils/team"
import { getTeamSilos } from "@/actions/admin/team-silos/get-team-silos"
import { getDealKey } from "@/utils/proxy-api/get-deal-key"

export const GET = apiRequestHandler(
  ["transactions:read"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const interval = req.nextUrl.searchParams.get("interval")

    const [team, silos, deals] = await Promise.all([
      getTeam(ctx.team.team_key),
      getTeamSilos(ctx.team.team_key),
      getDeals(ctx.team.team_key),
    ])

    const chainIds = silos.map((silo) => silo.chain_id)

    const results = await Promise.all(
      deals.map(async (deal) =>
        queryTransactions(team.is_demo_account, chainIds, {
          interval,
          dealId: await getDealKey(deal.id),
        }),
      ),
    )

    return NextResponse.json<DealTransactionCharts>({
      items: deals.map((deal, dealIndex) => ({
        dealId: deal.id,
        chart: getTransactionsChart(deal.name, results[dealIndex]),
      })),
    })
  },
)
