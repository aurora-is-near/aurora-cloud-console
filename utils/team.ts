import { Team } from "@/types/types"
import { adminSupabase } from "@/utils/supabase"

export const getTeam = async (teamKey: string): Promise<Team> => {
  const supabase = adminSupabase()
  const { data, error } = await supabase
    .from("teams")
    .select("id, name, website, email, team_key")
    .eq("team_key", teamKey)
    .single()

  if (error) {
    throw error
  }

  return data
}

export const isTeamMember = async (userId: number, teamId: number) => {
  const supabase = adminSupabase()
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
