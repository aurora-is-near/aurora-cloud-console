import { Team } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const getUserTeamKeys = async (userId: number) => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("teams")
    .select("team_key, users_teams!inner(user_id)")
    .eq("users_teams.user_id", userId)

  assertValidSupabaseResult(result)

  return result.data.map((team) => team.team_key)
}

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
