import { QueryResult } from "pg"
import { TransactionChart } from "../types/types"

export const getTransactionsChart = (
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
): TransactionChart => ({
  label,
  transactionsCount: results[0].rows[0].count,
  walletsCount: results[1].rows[0].count,
  transactionsPerDay: results[2].rows,
  walletsPerDay: results[3].rows,
})
