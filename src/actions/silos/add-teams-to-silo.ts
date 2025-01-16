"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const addTeamsToSilo = async (siloId: number, teamIds: number[]) => {
  const supabase = createAdminSupabaseClient()

  await supabase
    .from("silos_teams")
    .upsert(teamIds.map((teamId) => ({ silo_id: siloId, team_id: teamId })))
}
