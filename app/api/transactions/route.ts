import { NextResponse } from "next/server"
import { apiRequestHandler } from "@/utils/api"
import { query } from "../../../utils/proxy-db"
import { Transactions } from "../../../types/types"

// TODO: replace with actual user's silos
const SILOS = {
  "1313161554": "Mainnet",
  "1313161555": "Testnet",
}

const querySilo = async (chainId: string) =>
  Promise.all([
    query<{
      count: number
    }>(
      `
        SELECT count("id")::int
        FROM tx_traces
        WHERE chain_id = '${chainId}';
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
          WHERE chain_id = '${chainId}'
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
        WHERE "req_time" BETWEEN NOW() - INTERVAL '3 MONTH' AND NOW() AND chain_id = '${chainId}'
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
        WHERE "req_time" BETWEEN NOW() - INTERVAL '3 MONTH' AND NOW() AND chain_id = '${chainId}'
        GROUP BY 1
        ORDER BY 1;
      `,
    ),
  ])

export const GET = apiRequestHandler(["transactions:read"], async () => {
  const results = await Promise.all(Object.keys(SILOS).map(querySilo))

  return NextResponse.json<Transactions>({
    silos: Object.values(SILOS).map((label, siloIndex) => {
      const siloResults = results[siloIndex]

      return {
        label,
        transactionsCount: siloResults[0].rows[0].count,
        walletsCount: siloResults[1].rows[0].count,
        transactionsPerDay: siloResults[2].rows,
        walletsPerDay: siloResults[3].rows,
      }
    }),
  })
})
