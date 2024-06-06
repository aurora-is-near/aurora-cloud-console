"use server"

import { Silo } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getTeamSilosByKey = async (teamKey: string): Promise<Silo[]> => {
  const supabase = createAdminSupabaseClient()
  const { data: silos } = await supabase
    .from("silos")
    .select("*, teams!inner(team_key)")
    .order("id", { ascending: true })
    .eq("teams.team_key", teamKey)

  return silos ?? []
}
