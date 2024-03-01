import { createApiEndpoint } from "@/utils/api"
import { queryTransactions } from "../../../../utils/proxy-db/query-transactions"
import { getTransactionData } from "../../../../utils/transactions"
import { getTeamSilos } from "@/actions/team-silos/get-team-silos"

export const GET = createApiEndpoint(
  "getSilosTransactions",
  async (req, ctx) => {
    const silos = await getTeamSilos(ctx.team.id)

    const siloChainIds = silos.map((silo) => silo.chain_id)
    const interval = req.nextUrl.searchParams.get("interval")
    const results = await Promise.all(
      siloChainIds.map((chainId) =>
        queryTransactions(ctx.team.transaction_database, [chainId], {
          interval,
        }),
      ),
    )

    return {
      items: silos.map((silo, siloIndex) => ({
        siloId: silo.id,
        data: getTransactionData(silo.name, results[siloIndex]),
      })),
    }
  },
  {
    cache: {
      maxAge: "1h",
      staleWhileRevalidate: "1y",
    },
  },
)
