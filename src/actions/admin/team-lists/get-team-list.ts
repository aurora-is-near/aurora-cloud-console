"use server"

import { List } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getTeamList = async (
  teamId: number,
  listId: number,
): Promise<List | null> => {
  const supabase = createAdminSupabaseClient()
  const { data: list } = await supabase
    .from("lists")
    .select("*")
    .eq("id", listId)
    .eq("team_id", teamId)
    .maybeSingle()

  return list
}
