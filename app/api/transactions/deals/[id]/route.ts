import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { Transactions } from "../../../../../types/types"
import { queryTransactions } from "../../../../../utils/proxy-db/query-transactions"
import { abort } from "../../../../../utils/abort"
import { getTransactionsChart } from "../../../../../utils/transactions"
import { getDealById } from "@/utils/proxy-api/get-deal-by-id"
import { getSilos } from "@/actions/admin/silos/get-silos"

export const GET = apiRequestHandler(
  ["transactions:read"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const interval = req.nextUrl.searchParams.get("interval")
    const [silos, deal] = await Promise.all([
      getSilos(ctx.teamKey),
      getDealById(ctx.teamKey, Number(ctx.params.id)),
    ])

    if (!deal) {
      abort(404)
    }

    if (!deal) {
      abort(404)
    }

    const chainIds = silos.map((silo) => silo.chain_id)

    const results = await queryTransactions(chainIds, {
      interval,
      dealId: deal.key,
    })

    return NextResponse.json<Transactions>({
      items: [getTransactionsChart(deal.name, results)],
    })
  },
)
