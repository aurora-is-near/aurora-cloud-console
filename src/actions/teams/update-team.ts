"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Team } from "@/types/types"

export const updateTeam = async (
  id: number,
  inputs: Omit<Team, "id" | "created_at">,
): Promise<void> => {
  const supabase = createAdminSupabaseClient()

  await supabase.from("teams").update(inputs).eq("id", id)
}

export const updateTeamForm = async (
  id: number,
  inputs: Omit<
    Team,
    "id" | "created_at" | "team_key" | "transaction_database" | "updated_at"
  >,
): Promise<void> => {
  const supabase = createAdminSupabaseClient()

  await supabase.from("teams").update(inputs).eq("id", id)
}
