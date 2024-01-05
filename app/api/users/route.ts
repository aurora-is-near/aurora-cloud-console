import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import {
  queryUserWalletCount,
  queryUsers,
} from "../../../utils/proxy-db/query-users"
import { getDealById } from "@/utils/proxy-api/get-deal-by-id"
import { getSilos } from "@/utils/proxy-api/get-silos"

export const GET = apiRequestHandler(
  ["users:read"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const silos = await getSilos(ctx.teamKey)
    const siloChainIds = silos.map((silo) => silo.chain_id)
    const { searchParams } = req.nextUrl
    const limit = searchParams.get("limit") ?? 20
    const offset = searchParams.get("offset") ?? 0
    const dealId = searchParams.get("dealId")
    const dealKey = dealId
      ? (await getDealById(ctx.teamKey, Number(dealId)))?.key
      : null

    const results = await Promise.all([
      queryUserWalletCount(siloChainIds, { dealKey }),
      queryUsers(siloChainIds, {
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
