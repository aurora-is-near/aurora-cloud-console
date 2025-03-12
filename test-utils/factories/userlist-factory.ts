import { Rule, Userlist } from "@/types/types"

export const createMockUserList = (data?: Partial<Rule>): Userlist => ({
  id: 1,
  created_at: "2021-01-01T00:00:00.000Z",
  updated_at: "2021-01-01T00:00:00.000Z",
  deleted_at: "2021-01-01T00:00:00.000Z",
  team_id: 1,
  ui_enabled: true,
})

export const createMockUserLists = (
  count: number,
  data?: Partial<Userlist>,
): Userlist[] =>
  Array.from({ length: count }, (_, index) =>
    createMockUserList({
      id: index + 1,
      ...data,
    }),
  )
