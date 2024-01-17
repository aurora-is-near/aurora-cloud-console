import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { SiloTransactionCharts } from "../../../../types/types"
import { queryTransactions } from "../../../../utils/proxy-db/query-transactions"
import { getTransactionsChart } from "../../../../utils/transactions"
import { getTeam } from "@/utils/team"
import { abort } from "@/utils/abort"
import { getTeamSilos } from "@/actions/admin/team-silos/get-team-silos"

export const GET = apiRequestHandler(
  ["transactions:read"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    if (!ctx.teamKey) {
      abort(500, "No team key found")
    }

    const [team, silos] = await Promise.all([
      getTeam(ctx.teamKey),
      getTeamSilos(ctx.teamKey),
    ])

    const siloChainIds = silos.map((silo) => silo.chain_id)
    const interval = req.nextUrl.searchParams.get("interval")
    const results = await Promise.all(
      siloChainIds.map((chainId) =>
        queryTransactions(team.is_demo_account, [chainId], { interval }),
      ),
    )

    return NextResponse.json<SiloTransactionCharts>({
      items: silos.map((silo, siloIndex) => ({
        siloId: silo.id,
        chart: getTransactionsChart(silo.name, results[siloIndex]),
      })),
    })
  },
)
