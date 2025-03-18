"use server"

import { getAuthUser } from "@/actions/auth-user/get-auth-user"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { TeamSummary } from "@/types/types"
import { isAdminUser } from "@/utils/admin"

export const getTeamSummaries = async (): Promise<TeamSummary[]> => {
  const user = await getAuthUser()

  if (!user) {
    return []
  }

  const supabase = createAdminSupabaseClient()
  const query = supabase
    .from("teams")
    .select(
      "id, name, team_key, users_teams!inner(user_id), silos_teams(silo_id), users!inner(user_id)",
    )
    .order("id", { ascending: true })

  if (!isAdminUser(user.email)) {
    void query.eq("users.user_id", user.id)
  }

  const { data } = await query

  const items = data ?? []

  return items.map((item) => ({
    id: item.id,
    name: item.name,
    team_key: item.team_key,
    user_ids: item.users_teams.map(({ user_id }) => user_id),
    silo_ids: item.silos_teams.map(({ silo_id }) => silo_id),
  }))
}
