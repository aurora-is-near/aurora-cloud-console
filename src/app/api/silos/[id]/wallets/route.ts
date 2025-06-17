import { createApiEndpoint } from "@/utils/api"
import { getLimitAndOffset } from "@/utils/pagination"
import { abort } from "@/utils/abort"
import { getWalletDetails } from "@/utils/wallets"
import { getTeamSilo } from "@/actions/team-silos/get-team-silo"
import { queryWalletCount } from "@/utils/blockscout-db/query-wallet-count"
import { queryWallets } from "@/utils/blockscout-db/query-wallets"
import { getSiloBlockscoutDatabase } from "@/actions/silo-blockscout-database/get-silo-blockscout-database"
import { logger } from "@/logger"

export const GET = createApiEndpoint("getWallets", async (req, ctx) => {
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
      total: 0,
      items: [],
    }
  }

  const { limit, offset } = getLimitAndOffset(req)

  const [walletCount, wallets] = await Promise.all([
    queryWalletCount(blockscoutDatabase),
    queryWallets(blockscoutDatabase, {
      limit: Number(limit),
      offset: Number(offset),
    }),
  ])

  return {
    total: walletCount.rows[0].count,
    items: wallets.rows.map(getWalletDetails),
  }
})
