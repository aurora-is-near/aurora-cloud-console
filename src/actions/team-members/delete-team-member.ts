"use server"

import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const deleteTeamMember = async (teamKey: string, id: number) => {
  const supabase = createAdminSupabaseClient()
  const team = await getTeamByKey(teamKey)
  const result = await supabase
    .from("users_teams")
    .delete()
    .filter("user_id", "eq", id)
    .eq("user_id", id)
    .eq("team_id", team.id)

  assertValidSupabaseResult(result)
}
