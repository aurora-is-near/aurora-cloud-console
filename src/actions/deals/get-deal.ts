"use server"

import { Deal } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getDeal = async (
  id: number,
  teamId: number,
): Promise<Deal | null> => {
  const supabase = createAdminSupabaseClient()

  const result = await supabase
    .from("deals")
    .select("*")
    .eq("id", id)
    .eq("team_id", teamId)
    .single()

  return result.data
}
