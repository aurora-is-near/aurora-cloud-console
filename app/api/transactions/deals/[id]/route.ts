import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { Transactions } from "../../../../../types/types"
import { getSilos } from "../../../../../mockApi"
import { queryTransactions } from "../../../../../utils/proxy-db/query-transactions"
import { query } from "../../../../../utils/proxy-db/query"
import { abort } from "../../../../../utils/abort"

export const GET = apiRequestHandler(
  ["transactions:read"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const interval = req.nextUrl.searchParams.get("interval")
    console.log("req", ctx.params.id)
    const [silos, dealsResult] = await Promise.all([
      getSilos(),
      query<{
        deal: string
      }>(
        `
          SELECT "deal"
          FROM tx_traces
          WHERE "deal" = '${ctx.params.id}'
          LIMIT 1;
        `,
      ),
    ])

    if (!dealsResult.rowCount) {
      abort(404)
    }

    const chainIds = silos.map((silo) => silo.chainId)

    const results = await queryTransactions(chainIds, {
      interval,
      dealId: ctx.params.id,
    })

    return NextResponse.json<Transactions>({
      items: [
        {
          label: dealsResult.rows[0].deal,
          transactionsCount: results[0].rows[0].count,
          walletsCount: results[1].rows[0].count,
          transactionsPerDay: results[2].rows,
          walletsPerDay: results[3].rows,
        },
      ],
    })
  },
)
