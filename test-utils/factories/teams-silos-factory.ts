import { TeamSilo } from "@/types/types"
import { createMockSilo } from "./silo-factory"
import { createMockTeam } from "./team-factory"

export const createMockTeamSilo = (data?: Partial<TeamSilo>): TeamSilo => {
  const team = createMockTeam()
  const silo = createMockSilo()

  return {
    id: 1,
    team_id: team.id,
    silo_id: silo.id,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
    ...data,
  }
}

export const createMockTeamSilos = (
  count: number,
  data?: Partial<TeamSilo>,
): TeamSilo[] =>
  Array.from({ length: count }, (_, index) =>
    createMockTeamSilo({
      id: index + 1,
      team_id: index + 1,
      silo_id: index + 1,
      ...data,
    }),
  )
