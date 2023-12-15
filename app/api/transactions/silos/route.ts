import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { Transactions } from "../../../../types/types"
import { queryTransactions } from "../../../../utils/proxy-db/query-transactions"
import { getTransactionsChart } from "../../../../utils/transactions"
import { getSilos } from "@/utils/proxy-api/get-silos"

export const GET = apiRequestHandler(
  ["transactions:read"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const silos = await getSilos(ctx.teamKey)
    const siloChainIds = silos.map((silo) => silo.chainId)
    const interval = req.nextUrl.searchParams.get("interval")
    const results = await Promise.all(
      siloChainIds.map((chainId) => queryTransactions([chainId], { interval })),
    )

    return NextResponse.json<Transactions>({
      items: silos.map((silo, siloIndex) =>
        getTransactionsChart(silo.name, results[siloIndex]),
      ),
    })
  },
)
