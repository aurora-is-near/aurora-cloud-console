import { NextRequest, NextResponse } from "next/server"
import { apiRequestHandler } from "@/utils/api"
import {
  queryUserWalletCount,
  queryUsers,
} from "../../../utils/proxy-db/query-users"
import { getSilos } from "../../../mockApi"

export const GET = apiRequestHandler(
  ["users:read"],
  async (req: NextRequest) => {
    const silos = await getSilos()
    const siloChainIds = silos.map((silo) => silo.chainId)
    const { searchParams } = req.nextUrl
    const limit = searchParams.get("limit") ?? 20
    const offset = searchParams.get("offset") ?? 0
    const dealId = searchParams.get("dealId")

    const results = await Promise.all([
      queryUserWalletCount(siloChainIds, { dealId }),
      queryUsers(siloChainIds, {
        limit: Number(limit),
        offset: Number(offset),
        dealId,
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
