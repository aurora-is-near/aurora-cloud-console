import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { query } from "../../../../../utils/proxy-db/query"
import { Transactions } from "../../../../../types/types"
import { getSilos } from "../../../../../mockApi"
import { notFound } from "next/navigation"
import { queryTransactions } from "../../../../../utils/proxy-db/query-transactions"

export const GET = apiRequestHandler(
  ["transactions:read"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const interval = req.nextUrl.searchParams.get("interval")
    const [silos, deals] = await Promise.all([
      getSilos(),
      query<{
        deal: string
      }>('SELECT DISTINCT "deal" FROM tx_traces'),
    ])

    const silo = silos.find((silo) => silo.id === ctx.params.id)

    if (!silo) {
      notFound()
    }

    const results = await Promise.all(
      deals.rows.map(({ deal }) =>
        queryTransactions(silo.chainId, { interval, dealId: deal }),
      ),
    )

    return NextResponse.json<Transactions>({
      items: deals.rows.map((deal, dealIndex) => {
        const dealResults = results[dealIndex]

        return {
          label: deal.deal,
          transactionsCount: dealResults[0].rows[0].count,
          walletsCount: dealResults[1].rows[0].count,
          transactionsPerDay: dealResults[2].rows,
          walletsPerDay: dealResults[3].rows,
        }
      }),
    })
  },
)
