import { Pool, QueryResult, QueryResultRow } from "pg"
import { createDebugger } from "@/debug"
import { logger } from "@/logger"
import { DEVNET_CHAIN_ID } from "@/constants/devnet"
import { toError } from "../errors"

// Fake data for the chains below exists in our "seed" database
const DEMO_CHAINS = [1313161555, 1313161556, 1313161557, DEVNET_CHAIN_ID]
const DEMO_POOL = new Pool({
  database: "aurora_transaction_database_seed",
  host: "65.21.192.70",
  port: 1893,
  user: "txtest",
  password: process.env.AURORA_TRANSACTION_DATABASE_PASSWORD,
})

// Data for the chains below exists in our main aurora database.
const AURORA_CHAINS = [0, 1, 10, 100, 1030, 1115, 1116, 117, 1284, 1285]
const AURORA_POOL = new Pool({
  database: "aurora_transaction_database",
  host: "65.21.192.70",
  port: 1893,
  user: "txtest",
  password: process.env.AURORA_TRANSACTION_DATABASE_PASSWORD,
})

// Data for any remaining chains can be fetched from a third database that we
// are using for custom chains.
const DEFAULT_POOL = new Pool({
  database: "aurora_transaction_database",
  host: "65.108.120.211",
  port: 5437,
  user: "silos_tx_db",
  password: process.env.SILO_TRANSACTION_DATABASE_PASSWORD,
})

/**
 * Get the pool for the given chain ID.
 */
const getPool = (chainId: string) => {
  if (DEMO_CHAINS.includes(Number(chainId))) {
    return DEMO_POOL
  }

  if (AURORA_CHAINS.includes(Number(chainId))) {
    return AURORA_POOL
  }

  return DEFAULT_POOL
}

/**
 * Perform a query on the database.
 */
export const query = async <TRow extends QueryResultRow>(
  chainId: string,
  text: string,
  params?: string[],
): Promise<QueryResult<TRow>> => {
  const debug = createDebugger("proxy-db")
  const pool = getPool(chainId)

  debug("Proxy DB query", text)

  let res

  try {
    res = await pool.query<TRow>(text, params)
  } catch (err) {
    logger.error(`Proxy DB query error: ${toError(err).message}'\n${text}`)
    throw err
  }

  return res
}
