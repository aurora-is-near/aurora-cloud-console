import { NextRequest } from "next/server"
import { apiRequestHandler } from "@/utils/api"
import { ApiRequestContext } from "@/types/api"
import { SiloTransactionCharts } from "../../../../types/types"
import { queryTransactions } from "../../../../utils/proxy-db/query-transactions"
import { getTransactionsChart } from "../../../../utils/transactions"
import { getTeamSilos } from "@/actions/admin/team-silos/get-team-silos"

export const GET = apiRequestHandler<SiloTransactionCharts>(
  ["transactions:read"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const silos = await getTeamSilos(ctx.team.id)

    const siloChainIds = silos.map((silo) => silo.chain_id)
    const interval = req.nextUrl.searchParams.get("interval")
    const results = await Promise.all(
      siloChainIds.map((chainId) =>
        queryTransactions(ctx.team.is_demo_account, [chainId], { interval }),
      ),
    )

    return {
      items: silos.map((silo, siloIndex) => ({
        siloId: silo.id,
        chart: getTransactionsChart(silo.name, results[siloIndex]),
      })),
    }
  },
)
