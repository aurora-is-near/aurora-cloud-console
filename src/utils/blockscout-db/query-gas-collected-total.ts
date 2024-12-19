import { BlockscoutDatabase } from "@/types/types"
import { query } from "./query"

export const queryGasCollectedTotal = async (database: BlockscoutDatabase) => {
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
      `,
    ),
  ])
}
