"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { TeamSummary } from "@/types/types"

export const getTeamSummaries = async (): Promise<TeamSummary[]> => {
  const supabase = createAdminSupabaseClient()
  const { data } = await supabase
    .from("teams")
    .select("id, name, team_key")
    .order("id", { ascending: true })

  const items = data ?? []

  return items.map((item) => ({
    id: item.id,
    name: item.name,
    team_key: item.team_key,
  }))
}
