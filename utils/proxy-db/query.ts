import { Pool, QueryResult, QueryResultRow } from "pg"
import { toError } from "../errors"

const pool = new Pool({
  host: process.env.PROXY_DB_HOST,
  port: Number(process.env.PROXY_DB_PORT),
  user: process.env.PROXY_DB_USER,
  password: process.env.PROXY_DB_PASSWORD,
  database: process.env.PROXY_DB_DATABASE,
})

const SLOW_QUERY_THRESHOLD = 2000

export const query = async <TRow extends QueryResultRow>(
  text: string,
  params?: string[],
): Promise<QueryResult<TRow>> => {
  const start = Date.now()
  let res

  try {
    res = await pool.query<TRow>(text, params)
  } catch (err) {
    console.error(`Proxy DB query error: ${toError(err).message}'\n${text}`)
    throw err
  }

  const duration = Date.now() - start

  if (duration >= SLOW_QUERY_THRESHOLD) {
    console.warn(`Proxy DB slow query detected: ${duration}ms\n${text}`)
  }

  return res
}
