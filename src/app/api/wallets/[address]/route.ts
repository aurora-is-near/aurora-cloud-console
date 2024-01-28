import { NextRequest } from "next/server"
import { createApiEndpoint } from "@/utils/api"
import { ApiRequestContext } from "@/types/api"
import { queryWallets } from "../../../../utils/proxy-db/query-users"
import { getTeamSilos } from "@/actions/admin/team-silos/get-team-silos"
import { getDealKey } from "@/utils/proxy-api/get-deal-key"
import { abort } from "@/utils/abort"
import { getWalletDetails } from "@/utils/wallets"

export const GET = createApiEndpoint(
  "getWallet",
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const silos = await getTeamSilos(ctx.team.id)
    const siloChainIds = silos.map((silo) => silo.chain_id)
    const { searchParams } = req.nextUrl
    const dealId = searchParams.get("dealId")
    const dealKey = dealId ? await getDealKey(Number(dealId)) : null
    const walletAddress = searchParams.get("walletAddress")
      ? decodeURIComponent(searchParams.get("walletAddress")!)
      : null

    if (dealId && !dealKey) {
      abort(400, "Invalid deal id")
    }

    const result = await queryWallets(ctx.team.is_demo_account, siloChainIds, {
      limit: 1,
      dealKey,
      walletAddress,
    })

    const [row] = result.rows

    return getWalletDetails(row)
  },
)
