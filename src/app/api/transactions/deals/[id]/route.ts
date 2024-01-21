import { NextRequest } from "next/server"
import { apiRequestHandler } from "@/utils/api"
import { ApiRequestContext } from "@/types/api"
import { queryTransactions } from "../../../../../utils/proxy-db/query-transactions"
import { abort } from "../../../../../utils/abort"
import { getTransactionsChart } from "../../../../../utils/transactions"
import { getDealById } from "@/utils/proxy-api/get-deal-by-id"
import { getDealKey } from "@/utils/proxy-api/get-deal-key"
import { getTeamSilos } from "@/actions/admin/team-silos/get-team-silos"
import { DealTransactionCharts } from "@/types/types"

export const GET = apiRequestHandler<DealTransactionCharts>(
  ["transactions:read"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const interval = req.nextUrl.searchParams.get("interval")

    const [silos, deal] = await Promise.all([
      getTeamSilos(ctx.team.id),
      getDealById(ctx.team, Number(ctx.params.id)),
    ])

    if (!deal) {
      abort(404)
    }

    const chainIds = silos.map((silo) => silo.chain_id)

    const results = await queryTransactions(
      ctx.team.is_demo_account,
      chainIds,
      {
        interval,
        dealId: await getDealKey(deal.id),
      },
    )

    return {
      items: [
        {
          dealId: deal.id,
          chart: getTransactionsChart(deal.name, results),
        },
      ],
    }
  },
)
