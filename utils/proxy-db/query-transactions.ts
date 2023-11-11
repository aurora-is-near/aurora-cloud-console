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
    whereClause += ` AND "req_time" BETWEEN current_date - INTERVAL '${interval}' AND current_date - 1`
  }

  if (dealId) {
    whereClause += ` AND deal = '${dealId}'`
  }

  return whereClause
}

export const queryTransactions = async (chainIds: string[], params: Params) => {
  const { interval, ...restParams } = params
  const countWhereClause = getWhereClause(chainIds, restParams)
  const chartWhereClause = getWhereClause(chainIds, {
    ...restParams,
    interval: interval ?? DEFAULT_CHART_INTERVAL,
  })

  return Promise.all([
    query<{
      count: number
    }>(
      `
        SELECT count("id")::int
        ${FROM_CLAUSE}
        ${countWhereClause};
      `,
    ),
    query<{
      count: number
    }>(
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
