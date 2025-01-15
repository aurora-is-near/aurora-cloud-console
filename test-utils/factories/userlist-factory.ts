import { Userlist } from "@/types/types"

export const createMockUserlist = (
  overrides: Partial<Userlist> = {},
): Userlist => ({
  id: 1,
  team_id: 1,
  created_at: "2021-01-01T00:00:00.000Z",
  updated_at: "2021-01-01T00:00:00.000Z",
  deleted_at: null,
  ...overrides,
})
