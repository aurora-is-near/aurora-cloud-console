import { BlockscoutDatabase } from "@/types/types"
import { query } from "./query"

type Params = {
  startDate: string
  endDate: string
}

export const queryGasCollected = async (
  database: BlockscoutDatabase,
  params: Params,
) => {
  return Promise.all([
    query<{ count: number }>(
      database,
      `
        SELECT
            SUM(t.gas_used * t.gas_price) / 1e18 AS count
        FROM transactions t
        JOIN blocks b ON t.block_number = b.number
        -- Only successful transactions
        WHERE t.status = 1
          AND DATE(b.timestamp) BETWEEN '${params.startDate}' AND '${params.endDate}'
      `,
    ),
    query<{ day: string; count: number }>(
      database,
      `
        SELECT
            DATE(b.timestamp) AS day,
            SUM(t.gas_used * t.gas_price) / 1e18 AS count
        FROM transactions t
        JOIN blocks b ON t.block_number = b.number
        -- Only successful transactions
        WHERE t.status = 1
          AND DATE(b.timestamp) BETWEEN '${params.startDate}' AND '${params.endDate}'
        GROUP BY DATE(b.timestamp)
        ORDER BY day
      `,
    ),
  ])
}
