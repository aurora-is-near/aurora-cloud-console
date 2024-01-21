"use server"

import { Deal } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getTeamDeals = async (teamId: number): Promise<Deal[]> => {
  const supabase = createAdminSupabaseClient()
  const { data: deals } = await supabase
    .from("deals")
    .select("*, teams(id)")
    .order("created_at", { ascending: true })
    .eq("teams.id", teamId)

  return deals ?? []
}
