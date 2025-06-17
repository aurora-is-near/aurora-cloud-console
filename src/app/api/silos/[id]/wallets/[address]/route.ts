import { createApiEndpoint } from "@/utils/api"

import { abort } from "@/utils/abort"
import { getWalletDetails } from "@/utils/wallets"
import { getTeamSilo } from "@/actions/team-silos/get-team-silo"
import { getSiloBlockscoutDatabase } from "@/actions/silo-blockscout-database/get-silo-blockscout-database"
import { queryWallets } from "@/utils/blockscout-db/query-wallets"
import { logger } from "@/logger"

export const GET = createApiEndpoint("getWallet", async (_req, ctx) => {
  const siloId = Number(ctx.params.id)
  const { address } = ctx.params
  const [silo, blockscoutDatabase] = await Promise.all([
    getTeamSilo(ctx.team.id, siloId),
    getSiloBlockscoutDatabase(siloId),
  ])

  if (!silo || !address) {
    abort(404)
  }

  if (!blockscoutDatabase) {
    logger.warn(`No blockscout database found for silo ${siloId}`)

    abort(404)
  }

  const result = await queryWallets(blockscoutDatabase, {
    limit: 1,
    walletAddress: address,
  })

  const [row] = result.rows

  return getWalletDetails(row)
})
