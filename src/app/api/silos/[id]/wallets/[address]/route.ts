import { createApiEndpoint } from "@/utils/api"

import { abort } from "@/utils/abort"
import { getWalletDetails } from "@/utils/wallets"
import { getTeamSilo } from "@/actions/team-silos/get-team-silo"
import { getSiloBlockscoutDatabase } from "@/actions/silo-blockscout-database/get-silo-blockscout-database"
import { queryWallets } from "@/utils/blockscout-db/query-wallets"
import { logger } from "@/logger"

export const GET = createApiEndpoint("getWallet", async (req, ctx) => {
  const { searchParams } = req.nextUrl
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

    abort(404)
  }

  const walletAddressParam = searchParams.get("walletAddress")
  const walletAddress = walletAddressParam
    ? decodeURIComponent(walletAddressParam)
    : undefined

  const result = await queryWallets(blockscoutDatabase, {
    limit: 1,
    walletAddress,
  })

  const [row] = result.rows

  return getWalletDetails(row)
})
