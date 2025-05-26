"use server"

import type { Silo } from "@/types/types"

import { query } from "./query"

type Options = {
  startDate: string
  endDate: string
}

export const getChainTransactionsCost = async (
  silo: Silo,
  { startDate, endDate }: Options,
): Promise<string> => {
  const spentOnFeesQueryResult = await query<{ fees: string }>(`
    SELECT SUM(tokens_burnt)::text AS fees
    FROM transactions AS txs
    WHERE receiver_id = '${silo.engine_account}'
      AND block_timestamp BETWEEN '${startDate}' AND '${endDate}'
  `)

  return spentOnFeesQueryResult.rows[0].fees
}
