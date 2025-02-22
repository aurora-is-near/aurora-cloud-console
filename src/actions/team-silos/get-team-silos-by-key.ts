"use server"

import { Silo } from "@/types/types"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { getTeamSilos } from "@/actions/team-silos/get-team-silos"

export const getTeamSilosByKey = async (teamKey: string): Promise<Silo[]> => {
  const team = await getTeamByKey(teamKey)

  return getTeamSilos(team.id)
}
