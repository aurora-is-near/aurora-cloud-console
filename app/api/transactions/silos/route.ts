import { NextRequest, NextResponse } from "next/server"
import { apiRequestHandler } from "@/utils/api"
import { Transactions } from "../../../../types/types"
import { getSilos } from "../../../../mockApi"
import { queryTransactions } from "../../../../utils/proxy-db/query-transactions"
import { getTransactionsChart } from "../../../../utils/transactions"

export const GET = apiRequestHandler(
  ["transactions:read"],
  async (req: NextRequest) => {
    const silos = await getSilos()
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
