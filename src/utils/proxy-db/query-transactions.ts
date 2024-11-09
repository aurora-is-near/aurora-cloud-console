import { query } from "./query"

type Params = {
  interval?: string | null
  dealId?: string | null
}

const FROM_CLAUSE = "FROM tx_traces"
const DEFAULT_CHART_INTERVAL = "6 MONTH"

const getWhereClause = (chainId: string, { interval, dealId }: Params) => {
  let whereClause = `WHERE chain_id = '${chainId}'`

  if (interval) {
    whereClause += ` AND req_time >= current_date - INTERVAL '${interval}' AND req_time < current_date`
  }

  if (dealId) {
    whereClause += ` AND deal = '${dealId}'`
  }

  return whereClause
}

export const queryTransactions = async (chainId: string, params: Params) => {
  const countWhereClause = getWhereClause(chainId, params)
  const chartWhereClause = getWhereClause(chainId, {
    ...params,
    interval: params.interval ?? DEFAULT_CHART_INTERVAL,
  })

  return Promise.all([
    query<{
      count: number
    }>(
      chainId,
      `
        SELECT count("id")::int
        ${FROM_CLAUSE}
        ${countWhereClause};
      `,
    ),
    query<{
      count: number
    }>(
      chainId,
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
      chainId,
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
      chainId,
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
