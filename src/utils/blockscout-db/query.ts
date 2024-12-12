import { Pool, QueryResult, QueryResultRow } from "pg"
import { createDebugger } from "@/debug"
import { logger } from "@/logger"
import { BlockscoutDatabase } from "@/types/types"
import { toError } from "../errors"

const debug = createDebugger("blockscout-db")

const BLOCKSCOUT_POOLS: Record<number, Pool> = {}

const getPool = ({
  id,
  database,
  host,
  port,
  user,
  password,
}: BlockscoutDatabase) => {
  if (!BLOCKSCOUT_POOLS[id]) {
    BLOCKSCOUT_POOLS[id] = new Pool({
      database,
      host,
      port,
      user,
      password,
    })
  }

  return BLOCKSCOUT_POOLS[id]
}

/**
 * Perform a query on the database.
 */
export const query = async <TRow extends QueryResultRow>(
  database: BlockscoutDatabase,
  text: string,
  params?: string[],
): Promise<QueryResult<TRow>> => {
  debug("Blockscout DB query", text)

  const pool = getPool(database)

  try {
    return await pool.query<TRow>(text, params)
  } catch (err) {
    logger.error(`Blockscout DB query error: ${toError(err).message}'\n${text}`)
    throw err
  }
}
