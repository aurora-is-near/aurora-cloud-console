"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Team } from "@/types/types"

export const getTeam = async (id: number): Promise<Team | null> => {
  const supabase = createAdminSupabaseClient()
  const { data } = await supabase
    .from("teams")
    .select("*")
    .eq("id", id)
    .single()

  return data
}
