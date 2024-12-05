"use server"

import { Team } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getTeam = async (id: number): Promise<Team | null> => {
  const supabase = createAdminSupabaseClient()

  const { data: team } = await supabase
    .from("teams")
    .select("*")
    .eq("id", id)
    .single()

  return team
}
