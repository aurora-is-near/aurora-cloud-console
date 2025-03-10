import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const isTeamMember = async (userId: number, teamId: number) => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("users_teams")
    .select("user_id")
    .eq("user_id", userId)
    .eq("team_id", teamId)
    .maybeSingle()

  assertValidSupabaseResult(result)

  return !!result.data
}
