"use server"

import { Silo } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getTeamSiloByKey = async (
  teamKey: string,
  siloId: number,
): Promise<Silo | null> => {
  const supabase = createAdminSupabaseClient()
  const { data: silo } = await supabase
    .from("silos")
    .select("*, teams!inner(team_key)")
    .eq("id", siloId)
    .eq("teams.team_key", teamKey)
    .maybeSingle()

  return silo
}
