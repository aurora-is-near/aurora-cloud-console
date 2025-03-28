"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getFirstTeamSiloId = async (
  teamKey: string,
): Promise<number | null> => {
  const supabase = createAdminSupabaseClient()
  const { data } = await supabase
    .from("silos")
    .select("id, silos_teams!inner(silo_id), teams!inner(team_key)")
    .eq("teams.team_key", teamKey)
    .is("deleted_at", null)
    .limit(1)

  return data?.[0]?.id ?? null
}
