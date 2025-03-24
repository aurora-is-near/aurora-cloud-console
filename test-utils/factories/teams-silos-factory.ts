import { SilosTeams } from "@/types/types"
import { createMockSilo } from "./silo-factory"
import { createMockTeam } from "./team-factory"

export const createMockTeamSilo = (data?: Partial<SilosTeams>): SilosTeams => {
  const team = createMockTeam()
  const silo = createMockSilo()

  return {
    team_id: team.id,
    silo_id: silo.id,
    ...data,
  }
}

export const createMockTeamSilos = (
  count: number,
  data?: Partial<SilosTeams>,
): SilosTeams[] =>
  Array.from({ length: count }, (_, index) =>
    createMockTeamSilo({
      team_id: index + 1,
      silo_id: index + 1,
      ...data,
    }),
  )
