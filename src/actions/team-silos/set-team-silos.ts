"use server"

import { Silo } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { getTeamSilos } from "@/actions/team-silos/get-team-silos"

export const setTeamSilos = async (
  teamId: number,
  siloIds: number[],
): Promise<Silo[]> => {
  const supabase = createAdminSupabaseClient()

  await supabase.from("teams_silos").delete().eq("team_id", teamId)
  await supabase
    .from("teams_silos")
    .insert(siloIds.map((siloId) => ({ team_id: teamId, silo_id: siloId })))
    .eq("team_id", teamId)

  return getTeamSilos(teamId)
}
