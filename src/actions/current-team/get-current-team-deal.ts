"use server"

import { getCurrentTeam } from "./get-current-team"
import { getTeamDeal } from "@/actions/team-deals/get-team-deal"

export const getCurrentTeamDeal = async (dealId: number) => {
  const team = await getCurrentTeam()
  const silos = await getTeamDeal(team.id, dealId)

  return silos
}
