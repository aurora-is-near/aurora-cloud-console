import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { query } from "../../../../../utils/proxy-db/query"
import { Transactions } from "../../../../../types/types"
import { getDeals, getSilos } from "../../../../../mockApi"
import { queryTransactions } from "../../../../../utils/proxy-db/query-transactions"
import { abort } from "../../../../../utils/abort"
import { getTransactionsChart } from "../../../../../utils/transactions"

export const GET = apiRequestHandler(
  ["transactions:read"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const interval = req.nextUrl.searchParams.get("interval")
    const [silos, deals] = await Promise.all([getSilos(), getDeals()])

    const silo = silos.find((silo) => silo.id === ctx.params.id)

    if (!silo) {
      abort(404)
    }

    const results = await Promise.all(
      deals.map((deal) =>
        queryTransactions([silo.chainId], { interval, dealId: deal.id }),
      ),
    )

    return NextResponse.json<Transactions>({
      items: deals.map((deal, dealIndex) =>
        getTransactionsChart(deal.name, results[dealIndex]),
      ),
    })
  },
)
