import { Pool, QueryResult, QueryResultRow } from "pg"

import { logger } from "@/logger"
import { createDebugger } from "@/debug"

import { toError } from "../errors"

const debug = createDebugger("near-fee-collector-db")

export const query = async <TRow extends QueryResultRow>(
  text: string,
  params?: string[],
): Promise<QueryResult<TRow>> => {
  debug("Blockscout DB query", text)

  const pool = new Pool({
    database: process.env.NEAR_FEE_COLLECTOR_DB_NAME,
    host: process.env.NEAR_FEE_COLLECTOR_DB_HOST,
    port: Number(process.env.NEAR_FEE_COLLECTOR_DB_PORT),
    user: process.env.NEAR_FEE_COLLECTOR_DB_USERNAME,
    password: process.env.NEAR_FEE_COLLECTOR_DB_PASSWORD,
  })

  try {
    return await pool.query<TRow>(text, params)
  } catch (err) {
    logger.error(
      `Silos NEAR fee collector DB query error: ${toError(err).message}'\n${text}`,
    )
    throw err
  }
}
