import { Pool, QueryResult, QueryResultRow } from "pg"

import { createDebugger } from "@/debug"
import { logger } from "@/logger"

import { toError } from "../errors"

const debug = createDebugger("blockscout-db")

// TODO: These credentials are only for Aurora Testnet, update when all chains are migrated to a single DB
const BLOCKSCOUT_POOL = new Pool({
  database: "blockscout",
  host: "65.21.89.152",
  port: 8061,
  user: "blockscout",
  password: process.env.BLOCKSCOUT_DB_PASSWORD,
})

/**
 * Perform a query on the database.
 */
export const query = async <TRow extends QueryResultRow>(
  text: string,
  params?: string[],
): Promise<QueryResult<TRow>> => {
  debug("Blockscout DB query", text)

  try {
    return await BLOCKSCOUT_POOL.query<TRow>(text, params)
  } catch (err) {
    logger.error(`Blockscout DB query error: ${toError(err).message}'\n${text}`)
    throw err
  }
}
