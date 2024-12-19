import { logger } from "@/logger"
import { createApiEndpoint } from "@/utils/api"
import { getTeamSilo } from "@/actions/team-silos/get-team-silo"
import { getSiloBlockscoutDatabase } from "@/actions/silo-blockscout-database/get-silo-blockscout-database"

import { abort } from "../../../../../utils/abort"
import { queryGasCollectedTotal } from "../../../../../utils/blockscout-db/query-gas-collected-total"

export const GET = createApiEndpoint(
  "getSiloCollectedGasTotal",
  async (_req, ctx) => {
    const siloId = Number(ctx.params.id)
    const [silo, blockscoutDatabase] = await Promise.all([
      getTeamSilo(ctx.team.id, siloId),
      getSiloBlockscoutDatabase(siloId),
    ])

    if (!silo) {
      abort(404)
    }

    if (!blockscoutDatabase) {
      logger.warn(
        `Cannot query total gas collected as no blockscout database found for silo ${siloId}`,
      )

      return {
        count: 0,
      }
    }

    const result = await queryGasCollectedTotal(blockscoutDatabase)
    const count = result[0].rows[0]?.count ?? 0
    return { count }
  },
  {
    cache: {
      maxAge: "1h",
      staleWhileRevalidate: "1y",
    },
  },
)
