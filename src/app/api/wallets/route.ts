import { createApiEndpoint } from "@/utils/api"
import {
  queryWalletCount,
  queryWallets,
} from "../../../utils/proxy-db/query-users"
import { getTeamSilos } from "@/actions/admin/team-silos/get-team-silos"
import { getDealKey } from "@/utils/proxy-api/get-deal-key"
import { getLimitAndOffset } from "@/utils/pagination"
import { abort } from "@/utils/abort"
import { getWalletDetails } from "@/utils/wallets"

export const GET = createApiEndpoint("getWallets", async (req, ctx) => {
  const silos = await getTeamSilos(ctx.team.id)
  const siloChainIds = silos.map((silo) => silo.chain_id)
  const { searchParams } = req.nextUrl
  const { limit, offset } = getLimitAndOffset(req)
  const dealId = searchParams.get("dealId")
  const dealKey = dealId ? await getDealKey(Number(dealId)) : null

  if (dealId && !dealKey) {
    abort(400, "Invalid deal id")
  }

  const results = await Promise.all([
    queryWalletCount(ctx.team.is_demo_account, siloChainIds, {
      dealKey,
    }),
    queryWallets(ctx.team.is_demo_account, siloChainIds, {
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
