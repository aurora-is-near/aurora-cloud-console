import { createApiEndpoint } from "@/utils/api"
import { getDealKeyFromSearchParams } from "@/utils/proxy-api/get-deal-key-from-search-params"
import { abort } from "@/utils/abort"
import { getWalletDetails } from "@/utils/wallets"
import { getTeamSilo } from "@/actions/team-silos/get-team-silo"
import { queryWallets } from "../../../../utils/proxy-db/query-users"

export const GET = createApiEndpoint("getWallet", async (req, ctx) => {
  const { searchParams } = req.nextUrl
  const [silo, dealKey] = await Promise.all([
    getTeamSilo(ctx.team.id, Number(ctx.params.id)),
    getDealKeyFromSearchParams(searchParams),
  ])

  if (!silo) {
    abort(404)
  }

  const walletAddressParam = searchParams.get("walletAddress")
  const walletAddress = walletAddressParam
    ? decodeURIComponent(walletAddressParam)
    : null

  const result = await queryWallets(silo.chain_id, {
    limit: 1,
    dealKey,
    walletAddress,
  })

  const [row] = result.rows

  return getWalletDetails(row)
})
