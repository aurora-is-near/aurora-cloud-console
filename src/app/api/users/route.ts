import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import {
  queryUserWalletCount,
  queryUsers,
} from "../../../utils/proxy-db/query-users"
import { getTeamSilos } from "@/actions/admin/team-silos/get-team-silos"
import { getDealKey } from "@/utils/proxy-api/get-deal-key"

export const GET = apiRequestHandler(
  ["users:read"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const silos = await getTeamSilos(ctx.team.team_key)
    const siloChainIds = silos.map((silo) => silo.chain_id)
    const { searchParams } = req.nextUrl
    const limit = searchParams.get("limit") ?? 20
    const offset = searchParams.get("offset") ?? 0
    const dealId = searchParams.get("dealId")
    const dealKey = dealId ? await getDealKey(Number(dealId)) : null

    const results = await Promise.all([
      queryUserWalletCount(ctx.team.is_demo_account, siloChainIds, {
        dealKey,
      }),
      queryUsers(ctx.team.is_demo_account, siloChainIds, {
        limit: Number(limit),
        offset: Number(offset),
        dealKey,
      }),
    ])

    return NextResponse.json({
      total: results[0].rows[0].count,
      users: results[1].rows.map((row) => ({
        walletAddress: row.wallet_address,
        transactionsCount: row.transactions_count,
        createdAt: row.created_at,
        lastTransactionAt: row.last_transaction_at,
      })),
    })
  },
)
