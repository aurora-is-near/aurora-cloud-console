import { ProxyDatabase, TransactionsQuery } from "../../types/types"
import { query } from "./query"

type Params = {
  limit?: number
  offset?: number
  dealKey?: string | null
  walletAddress?: string | null
}

const FROM_CLAUSE = "FROM tx_traces"

const getWhereClause = (chainIds: string[], params: Params) => {
  let whereClause = `WHERE chain_id IN ('${chainIds.join("','")}')`

  if (params.dealKey) {
    whereClause += ` AND deal = '${params.dealKey}'`
  }

  if (params.walletAddress) {
    whereClause += ` AND "from" = '${params.walletAddress}'`
  }

  return whereClause
}

export const queryWallets = async (
  database: ProxyDatabase,
  chainIds: string[],
  params: Params,
) => {
  const { limit, offset } = params
  const whereClause = getWhereClause(chainIds, params)

  return query<TransactionsQuery>(
    database,
    `
      SELECT
        "from" as wallet_address,
        count(DISTINCT id) as number_of_transactions,
        min("req_time") as first_transaction_at,
        max("req_time") as last_transaction_at
      ${FROM_CLAUSE}
      ${whereClause}
      GROUP BY "from"
      ${typeof limit === "number" ? `LIMIT ${limit}` : ""}
      ${typeof offset === "number" ? `OFFSET ${offset}` : ""};
    `,
  )
}

export const queryWalletCount = async (
  database: ProxyDatabase,
  chainIds: string[],
  params: Params,
) => {
  const whereClause = getWhereClause(chainIds, params)

  return query<{
    count: number
  }>(
    database,
    `
    SELECT count(*)::int
    FROM (
      SELECT DISTINCT "from"
      ${FROM_CLAUSE}
      ${whereClause}
    ) AS temp;
  `,
  )
}
