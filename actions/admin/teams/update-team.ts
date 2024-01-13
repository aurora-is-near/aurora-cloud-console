"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Team } from "@/types/types"

export const updateTeam = async (
  id: number,
  inputs: Omit<Team, "id" | "created_at">,
): Promise<Team> => {
  const supabase = createAdminSupabaseClient()
  const { data, error } = await supabase
    .from("teams")
    .update(inputs)
    .eq("id", id)
    .select()
    .single()

  if (error) {
    throw error
  }

  if (!data) {
    throw new Error("No data returned when updating team")
  }

  return data
}
