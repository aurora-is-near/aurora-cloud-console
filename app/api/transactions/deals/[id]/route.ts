import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { Transactions } from "../../../../../types/types"
import { getDealById, getSilos } from "../../../../../mockApi"
import { queryTransactions } from "../../../../../utils/proxy-db/query-transactions"
import { abort } from "../../../../../utils/abort"
import { getTransactionsChart } from "../../../../../utils/transactions"

export const GET = apiRequestHandler(
  ["transactions:read"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const interval = req.nextUrl.searchParams.get("interval")

    const [silos, deal] = await Promise.all([
      getSilos(),
      getDealById(ctx.params.id),
    ])

    if (!deal) {
      abort(404)
    }

    const chainIds = silos.map((silo) => silo.chainId)

    const results = await queryTransactions(chainIds, {
      interval,
      dealId: ctx.params.id,
    })

    return NextResponse.json<Transactions>({
      items: [getTransactionsChart(deal.name, results)],
    })
  },
)
