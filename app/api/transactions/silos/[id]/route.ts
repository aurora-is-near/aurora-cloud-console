import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { query } from "../../../../../utils/proxy-db/query"
import { Transactions } from "../../../../../types/types"
import { getSilos } from "../../../../../mockApi"
import { queryTransactions } from "../../../../../utils/proxy-db/query-transactions"
import { abort } from "../../../../../utils/abort"
import { getTransactionsChart } from "../../../../../utils/transactions"

export const GET = apiRequestHandler(
  ["transactions:read"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const interval = req.nextUrl.searchParams.get("interval")
    const [silos, deals] = await Promise.all([
      getSilos(),
      query<{
        deal: string
      }>('SELECT DISTINCT "deal" FROM tx_traces;'),
    ])

    const silo = silos.find((silo) => silo.id === ctx.params.id)

    if (!silo) {
      abort(404)
    }

    const results = await Promise.all(
      deals.rows.map(({ deal }) =>
        queryTransactions([silo.chainId], { interval, dealId: deal }),
      ),
    )

    return NextResponse.json<Transactions>({
      items: deals.rows.map((deal, dealIndex) =>
        getTransactionsChart(deal.deal, results[dealIndex]),
      ),
    })
  },
)
