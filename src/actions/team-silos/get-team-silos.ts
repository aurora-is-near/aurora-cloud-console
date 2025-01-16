"use server"

import { Silo } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getTeamSilos = async (teamId: number): Promise<Silo[]> => {
  const supabase = createAdminSupabaseClient()
  const { data: silos } = await supabase
    .from("silos")
    .select("*, silos_teams!inner(silo_id)")
    .order("id", { ascending: true })
    .eq("silos_teams.team_id", teamId)

  return silos ?? []
}
