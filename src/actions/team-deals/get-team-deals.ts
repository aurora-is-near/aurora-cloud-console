"use server"

import { Deal } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getTeamDeals = async (teamId: number): Promise<Deal[]> => {
  const supabase = createAdminSupabaseClient()
  const { data: deals } = await supabase
    .from("deals")
    .select("*")
    .order("id", { ascending: true })
    .eq("team_id", teamId)
    .is("deleted_at", null)

  return deals ?? []
}
