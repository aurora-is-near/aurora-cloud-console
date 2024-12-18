"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Team } from "@/types/types"

export const getTeams = async (): Promise<Team[]> => {
  const supabase = createAdminSupabaseClient()
  const { data: teams } = await supabase
    .from("teams")
    .select("*")
    .order("id", { ascending: true })

  return teams ?? []
}
