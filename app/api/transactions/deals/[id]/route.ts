import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { getDealById } from "@/utils/proxy-api/get-deal-by-id"
import { getTeam } from "@/utils/team"
import { getTeamSilos } from "@/actions/admin/team-silos/get-team-silos"
import { DealTransactionCharts } from "../../../../../types/types"
import { queryTransactions } from "../../../../../utils/proxy-db/query-transactions"
import { abort } from "../../../../../utils/abort"
import { getTransactionsChart } from "../../../../../utils/transactions"

export const GET = apiRequestHandler(
  ["transactions:read"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const interval = req.nextUrl.searchParams.get("interval")

    if (!ctx.teamKey) {
      abort(500, "No team key found")
    }

    const [team, silos, deal] = await Promise.all([
      getTeam(ctx.teamKey),
      getTeamSilos(ctx.teamKey),
      getDealById(ctx.teamKey, Number(ctx.params.id)),
    ])

    if (!deal) {
      abort(404)
    }

    if (!deal) {
      abort(404)
    }

    const chainIds = silos.map((silo) => silo.chain_id)

    const results = await queryTransactions(
      team.transaction_database,
      chainIds,
      {
        interval,
        dealId: deal.key,
      },
    )

    return NextResponse.json<DealTransactionCharts>({
      items: [
        {
          dealId: deal.id,
          chart: getTransactionsChart(deal.name, results),
        },
      ],
    })
  },
)
