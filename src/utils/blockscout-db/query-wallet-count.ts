import { BlockscoutDatabase } from "@/types/types"
import { query } from "./query"

export const queryWalletCount = async (database: BlockscoutDatabase) => {
  return query<{ count: number }>(
    database,
    `
      SELECT COUNT(*)::int FROM (
        SELECT DISTINCT from_address_hash
        FROM transactions
        WHERE status = 1
      ) AS temp;
    `,
  )
}
