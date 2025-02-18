"use server"

import { Silo } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"

export const getTeamSiloByKey = async (
  teamKey: string,
  siloId: number,
): Promise<Silo | null> => {
  const supabase = createAdminSupabaseClient()
  const team = await getTeamByKey(teamKey)
  const { data: silo } = await supabase
    .from("silos")
    .select("*, silos_teams!inner(silo_id)")
    .eq("id", siloId)
    .eq("silos_teams.team_id", team.id)
    .is("deleted_at", null)
    .maybeSingle()

  return silo
}
