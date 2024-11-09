import { createApiEndpoint } from "@/utils/api"
import { getDealKey } from "@/utils/proxy-api/get-deal-key"
import { getLimitAndOffset } from "@/utils/pagination"
import { abort } from "@/utils/abort"
import { getWalletDetails } from "@/utils/wallets"
import { getTeamSiloByKey } from "@/actions/team-silos/get-team-silo-by-key"
import { getTeamSilo } from "@/actions/team-silos/get-team-silo"
import { getDealKeyFromSearchParams } from "@/utils/proxy-api/get-deal-key-from-search-params"
import {
  queryWalletCount,
  queryWallets,
} from "../../../utils/proxy-db/query-users"

export const GET = createApiEndpoint("getWallets", async (req, ctx) => {
  const { searchParams } = req.nextUrl
  const [silo, dealKey] = await Promise.all([
    getTeamSilo(ctx.team.id, Number(ctx.params.id)),
    getDealKeyFromSearchParams(searchParams),
  ])

  if (!silo) {
    abort(404)
  }

  const { limit, offset } = getLimitAndOffset(req)

  const results = await Promise.all([
    queryWalletCount(silo.chain_id, {
      dealKey,
    }),
    queryWallets(silo.chain_id, {
      limit: Number(limit),
      offset: Number(offset),
      dealKey,
    }),
  ])

  return {
    total: 0,
    items: results[1].rows.map(getWalletDetails),
  }
})
