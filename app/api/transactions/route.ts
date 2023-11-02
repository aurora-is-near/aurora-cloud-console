import { NextResponse } from "next/server"
import { apiRequestHandler } from "@/utils/api"
import { query } from "../../../utils/proxy-db"
import { Transactions } from "../../../types/types"

export const GET = apiRequestHandler(["transactions:read"], async () => {
  const results = await Promise.all([
    query('SELECT COUNT("id") FROM tx_traces', []),
    query(
      'SELECT COUNT(*) FROM (SELECT DISTINCT "from" FROM tx_traces) AS temp;',
    ),
  ])

  const { count: transactionsCount } = results[0].rows[0]
  const { count: walletCount } = results[1].rows[0]

  return NextResponse.json<Transactions>({
    totalTransactions: Number(transactionsCount),
    totalWallets: Number(walletCount),
  })
})
