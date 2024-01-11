import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { Transactions } from "../../../../types/types"
import { queryTransactions } from "../../../../utils/proxy-db/query-transactions"
import { getTransactionsChart } from "../../../../utils/transactions"
import { getSilos } from "@/actions/admin/silos/get-silos"
import { getTeam } from "@/utils/team"
import { abort } from "@/utils/abort"

export const GET = apiRequestHandler(
  ["transactions:read"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    if (!ctx.teamKey) {
      abort(500, "No team key found")
    }

    const [team, silos] = await Promise.all([
      getTeam(ctx.teamKey),
      getSilos(ctx.teamKey),
    ])

    const siloChainIds = silos.map((silo) => silo.chain_id)
    const interval = req.nextUrl.searchParams.get("interval")
    const results = await Promise.all(
      siloChainIds.map((chainId) =>
        queryTransactions(team.transaction_database, [chainId], { interval }),
      ),
    )

    return NextResponse.json<Transactions>({
      items: silos.map((silo, siloIndex) =>
        getTransactionsChart(silo.name, results[siloIndex]),
      ),
    })
  },
)
