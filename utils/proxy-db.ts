import { Pool } from "pg"

const pool = new Pool({
  host: process.env.PROXY_DB_HOST,
  port: Number(process.env.PROXY_DB_PORT),
  user: process.env.PROXY_DB_USER,
  password: process.env.PROXY_DB_PASSWORD,
  database: process.env.PROXY_DB_DATABASE,
})

export const query = async (text: string, params?: string[]) => {
  const start = Date.now()
  const res = await pool.query(text, params)
  const duration = Date.now() - start

  console.debug(`Proxy DB query (duration: ${duration}ms): ${text}`)

  return res
}
