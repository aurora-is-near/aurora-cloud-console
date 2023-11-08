import { NextRequest, NextResponse } from "next/server"
import { apiRequestHandler } from "@/utils/api"
import { query } from "../../../utils/proxy-db"

// TODO: replace with actual user's silos
const SILOS = {
  "1313161556": "Silo 1",
  "1313161557": "Silo 2",
}

export const GET = apiRequestHandler(
  ["users:read"],
  async (req: NextRequest) => {
    const { searchParams } = req.nextUrl
    const limit = searchParams.get("limit") ?? 20
    const offset = searchParams.get("offset") ?? 0
    const dealId = searchParams.get("dealId")

    const fromClause = "FROM tx_traces"
    let whereClause = `WHERE chain_id IN ('${Object.keys(SILOS).join("','")}')`

    if (dealId) {
      whereClause += ` AND deal = '${dealId}'`
    }

    const results = await Promise.all([
      query<{
        count: number
      }>(
        `
        SELECT count(*)::int
        FROM (
          SELECT DISTINCT "from"
          ${fromClause}
          ${whereClause}
        ) AS temp;
      `,
      ),
      query<{
        wallet_address: string
        transactions_count: number
        created_at: string
        last_transaction_at: string
      }>(
        `
          SELECT
            "from" as wallet_address,
            count(DISTINCT id) as transactions_count,
            min("req_time") as created_at,
            max("req_time") as last_transaction_at
          ${fromClause}
          ${whereClause}
          GROUP BY "from"
          LIMIT ${limit}
          OFFSET ${offset};
        `,
      ),
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
