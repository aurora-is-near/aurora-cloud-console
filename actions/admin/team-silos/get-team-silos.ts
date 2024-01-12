"use server"

import { Silo } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getTeamSilos = async (
  teamIdOrKey: number | string,
): Promise<Silo[]> => {
  const supabase = createAdminSupabaseClient()
  const { data: silos } = await supabase
    .from("silos")
    .select("*, teams(id, team_key)")
    .order("created_at", { ascending: false })

  return (
    silos?.filter((silo) =>
      silo.teams.some(
        (team) =>
          (typeof teamIdOrKey === "number" && team.id === teamIdOrKey) ||
          team.team_key === teamIdOrKey,
      ),
    ) ?? []
  )
}
