import { BlockscoutDatabase } from "@/types/types"
import { query } from "./query"

type Params = {
  interval?: string | null
}

export const queryTransactions = async (
  database: BlockscoutDatabase,
  params: Params,
) => {
  const { interval } = params
  let whereClause = "WHERE t.status = 1"

  if (interval) {
    whereClause += ` AND DATE(b.timestamp) >= current_date - INTERVAL '${interval}'`
  }

  return Promise.all([
    // 1. Total transactions
    query<{ count: number }>(
      database,
      `
        SELECT COUNT(*)::int AS count
        FROM transactions t
        JOIN blocks b ON t.block_number = b.number
        ${whereClause};
      `,
    ),

    // 2. Unique senders
    query<{ count: number }>(
      database,
      `
        SELECT COUNT(DISTINCT t.from_address_hash)::int AS count
        FROM transactions t
        JOIN blocks b ON t.block_number = b.number
        ${whereClause};
      `,
    ),

    // 3. Daily tx count
    query<{ day: string; count: number }>(
      database,
      `
        SELECT DATE(b.timestamp) AS day, COUNT(*)::int AS count
        FROM transactions t
        JOIN blocks b ON t.block_number = b.number
        ${whereClause}
        GROUP BY 1
        ORDER BY 1;
      `,
    ),

    // 4. Daily unique sender count
    query<{ day: string; count: number }>(
      database,
      `
        SELECT DATE(b.timestamp) AS day, COUNT(DISTINCT t.from_address_hash)::int AS count
        FROM transactions t
        JOIN blocks b ON t.block_number = b.number
        ${whereClause}
        GROUP BY 1
        ORDER BY 1;
      `,
    ),
  ])
}
