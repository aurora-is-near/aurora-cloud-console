import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { Transactions } from "../../../../types/types"
import { queryTransactions } from "../../../../utils/proxy-db/query-transactions"
import { getTransactionsChart } from "../../../../utils/transactions"
import { getDeals } from "@/utils/proxy-api/get-deals"
import { getSilos } from "@/actions/admin/silos/get-silos"

export const GET = apiRequestHandler(
  ["transactions:read"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const interval = req.nextUrl.searchParams.get("interval")
    const [silos, deals] = await Promise.all([
      getSilos(ctx.teamKey),
      getDeals(ctx.teamKey),
    ])

    const chainIds = silos.map((silo) => silo.chain_id)

    const results = await Promise.all(
      deals.map((deal) =>
        queryTransactions(chainIds, { interval, dealId: deal.key }),
      ),
    )

    return NextResponse.json<Transactions>({
      items: deals.map((deal, dealIndex) =>
        getTransactionsChart(deal.name, results[dealIndex]),
      ),
    })
  },
)
