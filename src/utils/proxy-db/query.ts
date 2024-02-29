import { Pool, QueryResult, QueryResultRow } from "pg"
import { toError } from "../errors"
import { createDebugger } from "@/debug"
import { TRANSACTION_DATABASES } from "@/constants/databases"
import { TransactionDatabaseType } from "@/types/types"

const POOLS: { [key in TransactionDatabaseType]: Pool } = {
  SILO: new Pool(TRANSACTION_DATABASES.SILO.config),
  AURORA: new Pool(TRANSACTION_DATABASES.AURORA.config),
  AURORA_DEMO: new Pool(TRANSACTION_DATABASES.AURORA_DEMO.config),
}

export const query = async <TRow extends QueryResultRow>(
  transactionDatabase: TransactionDatabaseType,
  text: string,
  params?: string[],
): Promise<QueryResult<TRow>> => {
  const debug = createDebugger("proxy-db")

  debug("Proxy DB query", text)

  let res

  try {
    res = await POOLS[transactionDatabase].query<TRow>(text, params)
  } catch (err) {
    console.error(`Proxy DB query error: ${toError(err).message}'\n${text}`)
    throw err
  }

  return res
}
