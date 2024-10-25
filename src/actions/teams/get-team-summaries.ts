"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Team } from "@/types/types"

type TeamSummary = Pick<Team, "id" | "name" | "team_key"> & {
  silo_ids: number[]
}

export const getTeamSummaries = async (): Promise<TeamSummary[]> => {
  const supabase = createAdminSupabaseClient()
  const { data } = await supabase
    .from("teams")
    .select("id, name, team_key, silos(id)")
    .order("id", { ascending: true })

  const items = data ?? []

  return items.map((item) => ({
    id: item.id,
    name: item.name,
    team_key: item.team_key,
    silo_ids: item.silos.map((silo: { id: number }) => silo.id),
  }))
}
