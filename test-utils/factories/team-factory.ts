import { Team } from "@/types/types"

export const createMockTeam = (data?: Partial<Team>): Team => ({
  id: 1,
  name: "Test Team",
  created_at: "2025-01-01T00:00:00Z",
  updated_at: "2025-01-01T00:00:00Z",
  prepaid_transactions: 100,
  team_key: "test-team",
  ...data,
})

export const createMockTeams = (count: number, data?: Partial<Team>): Team[] =>
  Array.from({ length: count }, (_, index) =>
    createMockTeam({
      id: index + 1,
      name: `Test Team ${index + 1}`,
      ...data,
    }),
  )
