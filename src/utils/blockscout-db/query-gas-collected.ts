import { query } from "./query"

type Params = {
  startDate: string
  endDate: string
}

export const queryGasCollected = async (_chainId: string, params: Params) => {
  // TODO: _chainId is not used because we are connected to the Aurora Testnet
  //       blockscout database. When we have a single blockscout db for all
  //       chains we will use this parameter
  return Promise.all([
    query<{ count: number }>(
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
