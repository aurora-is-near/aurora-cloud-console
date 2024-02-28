import { createApiEndpoint } from "@/utils/api"
import { queryTransactions } from "../../../../../utils/proxy-db/query-transactions"
import { abort } from "../../../../../utils/abort"
import { getTransactionData } from "../../../../../utils/transactions"
import { getDealKey } from "@/utils/proxy-api/get-deal-key"
import { getTeamSilos } from "@/actions/team-silos/get-team-silos"
import { getTeamDeal } from "@/actions/team-deals/get-team-deal"
import timestring from "timestring"

export const GET = createApiEndpoint(
  "getDealTransactions",
  async (req, ctx) => {
    const interval = req.nextUrl.searchParams.get("interval")

    const [silos, deal] = await Promise.all([
      getTeamSilos(ctx.team.id),
      getTeamDeal(ctx.team.id, Number(ctx.params.id)),
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
          data: getTransactionData(deal.name, results),
        },
      ],
    }
  },
  {
    cache: {
      maxAge: timestring("1h"),
      staleWhileRevalidate: timestring("1y"),
    },
  },
)
