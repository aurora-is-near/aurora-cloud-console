"use server"

import { getTeamSilos } from "../team-silos/get-team-silos"
import { getCurrentTeam } from "./get-current-team"

export const getCurrentTeamSilos = async () => {
  const team = await getCurrentTeam()
  const silos = await getTeamSilos(team.id)

  return silos
}
