import { createApiEndpoint } from "@/utils/api"
import { getTeamSilo } from "@/actions/team-silos/get-team-silo"
import { queryTransactions } from "@/utils/blockscout-db/query-transactions"
import { abort } from "@/utils/abort"
import { getTransactionData } from "@/utils/transactions"
import { getSiloBlockscoutDatabase } from "@/actions/silo-blockscout-database/get-silo-blockscout-database"
import { logger } from "@/logger"

export const GET = createApiEndpoint(
  "getSiloTransactions",
  async (req, ctx) => {
    const interval = req.nextUrl.searchParams.get("interval")
    const siloId = Number(ctx.params.id)
    const [silo, blockscoutDatabase] = await Promise.all([
      getTeamSilo(ctx.team.id, siloId),
      getSiloBlockscoutDatabase(siloId),
    ])

    if (!silo) {
      abort(404)
    }

    if (!blockscoutDatabase) {
      logger.warn(`No blockscout database found for silo ${siloId}`)

      return {
        items: [
          {
            siloId: silo.id,
            data: getTransactionData(silo.name, null),
          },
        ],
      }
    }

    const results = await queryTransactions(blockscoutDatabase, {
      interval,
    })

    return {
      items: [
        {
          siloId: silo.id,
          data: getTransactionData(silo.name, results),
        },
      ],
    }
  },
  {
    cache: {
      maxAge: "1h",
      staleWhileRevalidate: "1y",
    },
  },
)
