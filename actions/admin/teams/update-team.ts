"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Team } from "@/types/types"

export const updateTeam = async (
  id: number,
  inputs: Omit<Team, "id" | "created_at">,
) => {
  const supabase = createAdminSupabaseClient()
  const { data } = await supabase
    .from("teams")
    .update(inputs)
    .eq("id", id)
    .single()

  return data
}
