"use server"

import { Deal } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getTeamDealsByKey = async (teamKey: string): Promise<Deal[]> => {
  const supabase = createAdminSupabaseClient()
  const { data: deals } = await supabase
    .from("deals")
    .select("*, teams!inner(team_key)")
    .order("id", { ascending: true })
    .eq("teams.team_key", teamKey)
    .is("deleted_at", null)

  return deals ?? []
}
