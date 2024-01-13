"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Team } from "@/types/types"

export const createTeam = async (
  inputs: Omit<Team, "id" | "created_at">,
): Promise<Team> => {
  const supabase = createAdminSupabaseClient()
  const { data, error } = await supabase
    .from("teams")
    .insert(inputs)
    .select()
    .single()

  if (error) {
    throw error
  }

  if (!data) {
    throw new Error("No data returned when creating team")
  }

  return data
}
