import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { Transactions } from "../../../../../types/types"
import { queryTransactions } from "../../../../../utils/proxy-db/query-transactions"
import { abort } from "../../../../../utils/abort"
import { getTransactionsChart } from "../../../../../utils/transactions"
import { getDeals } from "@/utils/proxy-api/get-deals"
import { getSilos } from "@/actions/admin/silos/get-silos"
import { getTeam } from "@/utils/team"

export const GET = apiRequestHandler(
  ["transactions:read"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const interval = req.nextUrl.searchParams.get("interval")

    if (!ctx.teamKey) {
      abort(500, "No team key found")
    }

    const [team, silos, deals] = await Promise.all([
      getTeam(ctx.teamKey),
      getSilos(ctx.teamKey),
      getDeals(ctx.teamKey),
    ])

    const silo = silos.find((silo) => silo.id === Number(ctx.params.id))

    if (!silo) {
      abort(404)
    }

    const results = await Promise.all(
      deals.map((deal) =>
        queryTransactions(team.transaction_database, [silo.chain_id], {
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
