"use server"

import { getTeamSilo } from "@/actions/team-silos/get-team-silo"
import { getCurrentTeam } from "./get-current-team"

export const getCurrentTeamSilo = async (siloId: number) => {
  const team = await getCurrentTeam()
  const silos = await getTeamSilo(team.id, siloId)

  return silos
}
