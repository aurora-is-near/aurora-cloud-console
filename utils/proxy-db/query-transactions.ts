import { ProxyDatabase } from "@/types/types"
import { query } from "./query"

type Params = {
  interval?: string | null
  dealId?: string | null
}

const FROM_CLAUSE = "FROM tx_traces"
const DEFAULT_CHART_INTERVAL = "6 MONTH"

const getWhereClause = (chainIds: string[], { interval, dealId }: Params) => {
  let whereClause =
    chainIds.length === 1
      ? `WHERE chain_id = '${chainIds[0]}'`
      : `WHERE chain_id IN ('${chainIds.join("','")}')`

  if (interval) {
    whereClause += ` AND req_time >= current_date - INTERVAL '${interval}' AND req_time < current_date`
  }

  // Optimise the 6 month interval by only querying the first day of each month
  if (interval === "6 MONTH") {
    whereClause += ` AND EXTRACT(day FROM req_time)::integer = 1`
  }

  // Optimise the 3 month interval by only querying the first and 15th day of each month
  if (interval === "3 MONTH") {
    whereClause += ` AND (EXTRACT(day FROM req_time)::integer = 1 OR EXTRACT(day FROM req_time)::integer = 15)`
  }

  if (dealId) {
    whereClause += ` AND deal = '${dealId}'`
  }

  return whereClause
}

export const queryTransactions = async (
  database: ProxyDatabase,
  chainIds: string[],
  params: Params,
) => {
  const countWhereClause = getWhereClause(chainIds, params)
  const chartWhereClause = getWhereClause(chainIds, {
    ...params,
    interval: params.interval ?? DEFAULT_CHART_INTERVAL,
  })

  return Promise.all([
    query<{
      count: number
    }>(
      database,
      `
        SELECT count("id")::int
        ${FROM_CLAUSE}
        ${countWhereClause};
      `,
    ),
    query<{
      count: number
    }>(
      database,
      `
        SELECT count(*)::int
        FROM (
          SELECT DISTINCT "from"
          ${FROM_CLAUSE}
          ${countWhereClause}
        ) AS temp;
      `,
    ),
    query<{
      day: string
      count: number
    }>(
      database,
      `
        SELECT date_trunc('day', "req_time") as "day", count(id)::int as count
        ${FROM_CLAUSE}
        ${chartWhereClause}
        GROUP BY 1
        ORDER BY 1;
      `,
    ),
    query<{
      day: string
      count: number
    }>(
      database,
      `
        SELECT date_trunc('day', "req_time") as "day", count(DISTINCT "from")::int as count
        ${FROM_CLAUSE}
        ${chartWhereClause}
        GROUP BY 1
        ORDER BY 1;
      `,
    ),
  ])
}
