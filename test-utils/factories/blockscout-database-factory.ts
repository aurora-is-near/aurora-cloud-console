import { BlockscoutDatabase } from "@/types/types"

export const createBlockscoutDatabase = (
  data?: Partial<BlockscoutDatabase>,
): BlockscoutDatabase => ({
  id: 1,
  name: "Test Database",
  created_at: "2021-01-01T00:00:00Z",
  updated_at: "2021-01-01T00:00:00Z",
  database: "blockscout",
  host: "localhost",
  port: 1234,
  user: "test",
  password: "secret",
  ...data,
})

export const createBlockscoutDatabases = (
  count: number,
  data?: Partial<BlockscoutDatabase>,
): BlockscoutDatabase[] =>
  Array.from({ length: count }, (_, index) =>
    createBlockscoutDatabase({
      id: index + 1,
      name: `Test Database ${index + 1}`,
      ...data,
    }),
  )
