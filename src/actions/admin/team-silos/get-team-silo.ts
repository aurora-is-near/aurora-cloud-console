"use server"

import { Silo } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getTeamSilo = async (
  teamId: number,
  siloId: number,
): Promise<Silo | null> => {
  const supabase = createAdminSupabaseClient()
  const { data: silo } = await supabase
    .from("silos")
    .select("*, teams(id)")
    .eq("id", siloId)
    .eq("teams.id", teamId)
    .maybeSingle()

  return silo
}
