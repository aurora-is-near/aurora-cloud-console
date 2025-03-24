"use server"

import { getAuthUser } from "@/actions/auth-user/get-auth-user"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { TeamSummary } from "@/types/types"
import { isAdminUser } from "@/utils/admin"

type GetTeamSummariesOptions = {
  page?: number
  limit?: number
  searchQuery?: string
}

export const getTeamSummaries = async ({
  page = 1,
  limit = 100,
  searchQuery,
}: GetTeamSummariesOptions = {}): Promise<{
  teams: TeamSummary[]
  total: number
  nextPage?: GetTeamSummariesOptions
}> => {
  const user = await getAuthUser()

  if (!user) {
    return { teams: [], total: 0 }
  }

  const supabase = createAdminSupabaseClient()

  const from = (page - 1) * limit
  const to = from + limit - 1

  let query = supabase
    .from("teams")
    .select(
      "id, name, team_key, users_teams(user_id), silos_teams(silo_id), users(user_id)",
      { count: "exact" },
    )
    .order("id", { ascending: true })
    .range(from, to)

  if (!isAdminUser(user.email)) {
    query = query.eq("users.user_id", user.id)
  }

  if (searchQuery?.trim()) {
    query = query.ilike("name", `%${searchQuery}%`)
  }

  const { data, count } = await query

  const items = data ?? []

  return {
    teams: items.map((item) => ({
      id: item.id,
      name: item.name,
      team_key: item.team_key,
      user_ids: item.users_teams.map(({ user_id }) => user_id),
      silo_ids: item.silos_teams.map(({ silo_id }) => silo_id),
    })),
    total: count ?? 0,
    nextPage: to < (count ?? 0) ? { page: page + 1, limit } : undefined,
  }
}
