import { TransactionDataSchema } from "@/types/api-schemas"
import { QueryResult } from "pg"

export const getTransactionData = (
  label: string,
  results: [
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
  ],
): TransactionDataSchema => ({
  label,
  transactionsCount: results[0].rows[0].count,
  walletsCount: results[1].rows[0].count,
  transactionsPerDay: results[2].rows,
  walletsPerDay: results[3].rows,
})
