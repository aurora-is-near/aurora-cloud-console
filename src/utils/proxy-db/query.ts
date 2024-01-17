import { Pool, QueryResult, QueryResultRow } from "pg"
import { toError } from "../errors"
import { PROXY_DATABASES } from "../../constants/databases"

const pools = PROXY_DATABASES.reduce<{ [x: string]: Pool }>(
  (acc, database) => ({
    ...acc,
    [database]: new Pool({
      host: process.env.PROXY_DB_HOST,
      port: Number(process.env.PROXY_DB_PORT),
      user: process.env.PROXY_DB_USER,
      password: process.env.PROXY_DB_PASSWORD,
      database,
    }),
  }),
  {},
)

export const query = async <TRow extends QueryResultRow>(
  isDemoAccount: boolean,
  text: string,
  params?: string[],
): Promise<QueryResult<TRow>> => {
  const database: (typeof PROXY_DATABASES)[number] = isDemoAccount
    ? "aurora_transaction_database_seed"
    : "aurora_transaction_database"

  let res

  try {
    res = await pools[database].query<TRow>(text, params)
  } catch (err) {
    console.error(`Proxy DB query error: ${toError(err).message}'\n${text}`)
    throw err
  }

  console.log(text)

  return res
}
