"use server"

import { getTeamDeals } from "@/actions/team-deals/get-team-deals"
import { getCurrentTeam } from "./get-current-team"

export const getCurrentTeamDeals = async () => {
  const team = await getCurrentTeam()
  const silos = await getTeamDeals(team.id)

  return silos
}
