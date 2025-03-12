"use server"

import { Silo } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getTeamSilo = async (
  teamId: number,
  siloId: number,
): Promise<Silo | null> => {
  const supabase = createAdminSupabaseClient()
  const { data: silo } = await supabase
    .from("silos")
    .select("*, silos_teams!inner(silo_id)")
    .eq("id", siloId)
    .eq("silos_teams.team_id", teamId)
    .is("deleted_at", null)
    .maybeSingle()

  return silo
}
