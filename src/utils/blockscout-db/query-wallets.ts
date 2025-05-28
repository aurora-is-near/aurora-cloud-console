import { BlockscoutDatabase, TransactionsQuery } from "@/types/types"
import { query } from "./query"

export const queryWallets = async (
  database: BlockscoutDatabase,
  params: {
    limit?: number
    offset?: number
    walletAddress?: string
  },
) => {
  const { limit, offset, walletAddress } = params
  let whereClause = "WHERE t.status = 1"

  if (walletAddress) {
    whereClause += ` AND t.from_address_hash = '${walletAddress}'`
  }

  return query<TransactionsQuery>(
    database,
    `
      SELECT
        encode(t.from_address_hash, 'hex') AS wallet_address,
        COUNT(*) AS number_of_transactions,
        MIN(b.timestamp) AS first_transaction_at,
        MAX(b.timestamp) AS last_transaction_at
      FROM transactions t
      JOIN blocks b ON t.block_number = b.number
      ${whereClause}
      GROUP BY t.from_address_hash
      ORDER BY number_of_transactions DESC
      ${typeof limit === "number" ? `LIMIT ${limit}` : ""}
      ${typeof offset === "number" ? `OFFSET ${offset}` : ""};
    `,
  )
}
