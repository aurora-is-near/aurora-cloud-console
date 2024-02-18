"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { getCurrentTeam } from "@/utils/current-team"
import { assertValidSupabaseResult } from "@/utils/supabase"
import { headers } from "next/headers"

export const deleteTeamMember = async (id: number) => {
  const supabase = createAdminSupabaseClient()
  const team = await getCurrentTeam(headers())
  const result = await supabase
    .from("users_teams")
    .delete()
    .filter("user_id", "eq", id)
    .eq("user_id", id)
    .eq("team_id", team.id)

  assertValidSupabaseResult(result)
}
