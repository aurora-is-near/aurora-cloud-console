import { NextRequest, NextResponse } from "next/server"
import { apiRequestHandler } from "@/utils/api"
import { query } from "../../../utils/proxy-db/query"
import { Transactions } from "../../../types/types"
import { getSilos } from "../../../mockApi"

const DEFAULT_CHART_INTERVAL = "6 MONTH"

const getWhereClause = (chainId: string, interval: string | null) => `
  WHERE chain_id = '${chainId}'${
    interval
      ? ` AND "req_time" BETWEEN current_date - INTERVAL '${interval}' AND current_date - 1`
      : ""
  }
`

const querySilo = async (chainId: string, interval: string | null) => {
  const countWhereClause = getWhereClause(chainId, interval)
  const chartWhereClause = getWhereClause(
    chainId,
    interval ?? DEFAULT_CHART_INTERVAL,
  )

  return Promise.all([
    query<{
      count: number
    }>(
      `
        SELECT count("id")::int
        FROM tx_traces
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
          FROM tx_traces
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
        FROM tx_traces
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
        FROM tx_traces
        ${chartWhereClause}
        GROUP BY 1
        ORDER BY 1;
      `,
    ),
  ])
}

export const GET = apiRequestHandler(
  ["transactions:read"],
  async (req: NextRequest) => {
    const silos = await getSilos()
    const siloChainIds = silos.map((silo) => silo.chainId)
    const interval = req.nextUrl.searchParams.get("interval")
    const results = await Promise.all(
      siloChainIds.map((chainId) => querySilo(chainId, interval)),
    )

    return NextResponse.json<Transactions>({
      silos: silos.map((silo, siloIndex) => {
        const siloResults = results[siloIndex]

        return {
          label: silo.name,
          transactionsCount: siloResults[0].rows[0].count,
          walletsCount: siloResults[1].rows[0].count,
          transactionsPerDay: siloResults[2].rows,
          walletsPerDay: siloResults[3].rows,
        }
      }),
    })
  },
)
