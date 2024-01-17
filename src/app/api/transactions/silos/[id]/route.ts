import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { SiloTransactionCharts } from "../../../../../types/types"
import { queryTransactions } from "../../../../../utils/proxy-db/query-transactions"
import { abort } from "../../../../../utils/abort"
import { getTransactionsChart } from "../../../../../utils/transactions"
import { getDeals } from "@/utils/proxy-api/get-deals"
import { getTeam } from "@/utils/team"
import { getTeamSilos } from "@/actions/admin/team-silos/get-team-silos"
import { getDealKey } from "@/utils/proxy-api/get-deal-key"

export const GET = apiRequestHandler(
  ["transactions:read"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const interval = req.nextUrl.searchParams.get("interval")

    if (!ctx.teamKey) {
      abort(500, "No team key found")
    }

    const [team, silos, deals] = await Promise.all([
      getTeam(ctx.teamKey),
      getTeamSilos(ctx.teamKey),
      getDeals(ctx.teamKey),
    ])

    const silo = silos.find((silo) => silo.id === Number(ctx.params.id))

    if (!silo) {
      abort(404)
    }

    const results = await Promise.all(
      deals.map(async (deal) =>
        queryTransactions(team.is_demo_account, [silo.chain_id], {
          interval,
          dealId: await getDealKey(deal.id),
        }),
      ),
    )

    return NextResponse.json<SiloTransactionCharts>({
      items: deals.map((deal, dealIndex) => ({
        siloId: silo.id,
        chart: getTransactionsChart(deal.name, results[dealIndex]),
      })),
    })
  },
)
