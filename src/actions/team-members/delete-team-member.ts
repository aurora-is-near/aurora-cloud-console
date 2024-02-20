"use server"

import { getCurrentTeam } from "@/actions/current-team/get-current-team"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const deleteTeamMember = async (id: number) => {
  const supabase = createAdminSupabaseClient()
  const team = await getCurrentTeam()
  const result = await supabase
    .from("users_teams")
    .delete()
    .filter("user_id", "eq", id)
    .eq("user_id", id)
    .eq("team_id", team.id)

  assertValidSupabaseResult(result)
}
