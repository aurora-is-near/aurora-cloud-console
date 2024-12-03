import { query } from "./query"

type Params = {
  date: string
}

export const queryGasCollected = async (chainId: string, params: Params) => {
  return Promise.all([
    query<{
      count: number
    }>(
      chainId,
      `
        SELECT
          SUM(CAST(gas AS NUMERIC)) - SUM(CAST(gas_used AS NUMERIC)) AS count
        FROM tx_traces
        WHERE
          chain_id = '${chainId}'
          AND DATE_TRUNC('month', req_time) = DATE_TRUNC('month', '${params.date}'::DATE)
          AND req_time < CURRENT_DATE
      `,
    ),
    query<{
      day: string
      count: number
    }>(
      chainId,
      `
          WITH date_series AS (
            SELECT
              generate_series(
                  DATE_TRUNC('month', '${params.date}'::DATE),
                  DATE_TRUNC('month', '${params.date}'::DATE) + INTERVAL '1 month' - INTERVAL '1 day',
                  '1 day'
              ) AS day
          )

          SELECT
            ds.day,
            COALESCE(SUM(CAST(gas AS NUMERIC)) - SUM(CAST(gas_used AS NUMERIC)), 0) AS count
          FROM date_series ds
          LEFT JOIN
              tx_traces t ON DATE(t.req_time) = ds.day
              AND t.chain_id = '${chainId}'
              AND t.req_time < CURRENT_DATE
          GROUP BY ds.day
          ORDER BY ds.day
        `,
    ),
  ])
}
