import { createApiEndpoint } from "@/utils/api"
import { getLimitAndOffset } from "@/utils/pagination"
import { abort } from "@/utils/abort"
import { getWalletDetails } from "@/utils/wallets"
import { getTeamSilo } from "@/actions/team-silos/get-team-silo"
import {
  queryWalletCount,
  queryWallets,
} from "../../../utils/proxy-db/query-users"

export const GET = createApiEndpoint("getWallets", async (req, ctx) => {
  const silo = await getTeamSilo(ctx.team.id, Number(ctx.params.id))

  if (!silo) {
    abort(404)
  }

  const { limit, offset } = getLimitAndOffset(req)

  const results = await Promise.all([
    queryWalletCount(silo.chain_id),
    queryWallets(silo.chain_id, {
      limit: Number(limit),
      offset: Number(offset),
    }),
  ])

  return {
    total: 0,
    items: results[1].rows.map(getWalletDetails),
  }
})
