"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Team } from "@/types/types"

export const createTeam = async (inputs: Omit<Team, "id" | "created_at">) => {
  const supabase = createAdminSupabaseClient()
  const { data } = await supabase.from("teams").insert(inputs).select().single()

  return data
}
