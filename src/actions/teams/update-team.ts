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
    "id" | "onboarding_status" | "created_at" | "team_key" | "updated_at"
  >,
): Promise<void> => {
  const supabase = createAdminSupabaseClient()

  await supabase.from("teams").update(inputs).eq("id", id)
}
