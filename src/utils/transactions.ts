import { QueryResult } from "pg"
import { TransactionDataSchema } from "@/types/api-schemas"

export const getTransactionData = (
  label: string,
  results:
    | [
        QueryResult<{
          count: number
        }>,
        QueryResult<{
          count: number
        }>,
        QueryResult<{
          day: string
          count: number
        }>,
        QueryResult<{
          day: string
          count: number
        }>,
      ]
    | null,
): TransactionDataSchema => ({
  label,
  transactionsCount: results?.[0].rows[0]?.count ?? 0,
  walletsCount: results?.[1].rows[0]?.count ?? 0,
  transactionsPerDay: results?.[2].rows ?? [],
  walletsPerDay: results?.[3].rows ?? [],
})
