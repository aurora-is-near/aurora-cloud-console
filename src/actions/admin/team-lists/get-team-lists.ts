"use server"

import { List } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getTeamLists = async (teamId: number): Promise<List[]> => {
  const supabase = createAdminSupabaseClient()
  const { data: lists } = await supabase
    .from("lists")
    .select("*")
    .order("created_at", { ascending: true })
    .eq("team_id", teamId)

  return lists ?? []
}
