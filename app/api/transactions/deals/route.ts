import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { Transactions } from "../../../../types/types"
import { queryTransactions } from "../../../../utils/proxy-db/query-transactions"
import { getTransactionsChart } from "../../../../utils/transactions"
import { getDeals } from "@/utils/proxy-api/get-deals"
import { abort } from "@/utils/abort"
import { getTeam } from "@/utils/team"
import { getTeamSilos } from "@/actions/admin/team-silos/get-team-silos"

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

    const chainIds = silos.map((silo) => silo.chain_id)

    const results = await Promise.all(
      deals.map((deal) =>
        queryTransactions(team.transaction_database, chainIds, {
          interval,
          dealId: deal.key,
        }),
      ),
    )

    return NextResponse.json<Transactions>({
      items: deals.map((deal, dealIndex) =>
        getTransactionsChart(deal.name, results[dealIndex]),
      ),
    })
  },
)
