"use server"

import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { TeamMember } from "@/types/types"

export const getTeamMembers = async (
  teamKey: string,
): Promise<TeamMember[]> => {
  const supabase = createAdminSupabaseClient()
  const team = await getTeamByKey(teamKey)

  const { data: users, error: usersError } = await supabase
    .from("users")
    .select(
      "id, name, email, user_id, users_teams!inner(user_id, confirmed_at)",
    )
    .eq("users_teams.team_id", team.id)

  if (usersError) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw usersError
  }

  return users.map((user) => ({
    id: user.id,
    userUuid: user.user_id,
    name: user.name,
    email: user.email,
    isPending: !user.users_teams[0]?.confirmed_at,
  }))
}
