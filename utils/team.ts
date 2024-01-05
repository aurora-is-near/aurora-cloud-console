import { Team } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getTeam = async (teamKey: string): Promise<Team> => {
  const supabase = createAdminSupabaseClient()
  const { data, error } = await supabase
    .from("teams")
    .select()
    .eq("team_key", teamKey)
    .single()

  if (error) {
    throw error
  }

  return data
}

export const getUserTeamKeys = async (userId: number) => {
  const supabase = createAdminSupabaseClient()
  const { data, error } = await supabase
    .from("teams")
    .select("team_key, users_teams!inner(user_id)")
    .eq("users_teams.user_id", userId)

  if (error) {
    throw error
  }

  return data.map((team) => team.team_key)
}

export const isTeamMember = async (userId: number, teamId: number) => {
  const supabase = createAdminSupabaseClient()
  const { data, error } = await supabase
    .from("users_teams")
    .select("user_id")
    .eq("user_id", userId)
    .eq("team_id", teamId)
    .maybeSingle()

  if (error) {
    throw error
  }

  return !!data
}
