import { List } from "@/types/types"

export const createMockList = (data?: Partial<List>): List => ({
  id: 1,
  name: "Test List",
  team_id: 1,
  created_at: "2021-01-01T00:00:00Z",
  ...data,
})

export const createMockLists = (count: number, data?: Partial<List>): List[] =>
  Array.from({ length: count }, (_, index) =>
    createMockList({
      id: index + 1,
      name: `Test List ${index + 1}`,
      ...data,
    }),
  )
