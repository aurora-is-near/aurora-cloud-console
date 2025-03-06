"use server"

import { Silo } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getTeamSilosByKey = async (teamKey: string): Promise<Silo[]> => {
  const supabase = createAdminSupabaseClient()
  const { data: silos } = await supabase
    .from("silos")
    .select("*, silos_teams!inner(silo_id), teams!inner(team_key)")
    .eq("teams.team_key", teamKey)
    .is("deleted_at", null)

  return silos ?? []
}
