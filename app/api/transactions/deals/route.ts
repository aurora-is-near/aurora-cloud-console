import { NextRequest, NextResponse } from "next/server"
import { apiRequestHandler } from "@/utils/api"
import { query } from "../../../../utils/proxy-db/query"
import { Transactions } from "../../../../types/types"
import { getDeals, getSilos } from "../../../../mockApi"
import { queryTransactions } from "../../../../utils/proxy-db/query-transactions"
import { getTransactionsChart } from "../../../../utils/transactions"

export const GET = apiRequestHandler(
  ["transactions:read"],
  async (req: NextRequest) => {
    const interval = req.nextUrl.searchParams.get("interval")
    const [silos, deals] = await Promise.all([getSilos(), getDeals()])

    const chainIds = silos.map((silo) => silo.chainId)

    const results = await Promise.all(
      deals.map((deal) =>
        queryTransactions(chainIds, { interval, dealId: deal.id }),
      ),
    )

    return NextResponse.json<Transactions>({
      items: deals.map((deal, dealIndex) =>
        getTransactionsChart(deal.name, results[dealIndex]),
      ),
    })
  },
)
