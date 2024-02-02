"use server"

import { Silo } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getTeamSilos = async (teamId: number): Promise<Silo[]> => {
  const supabase = createAdminSupabaseClient()
  const { data: silos } = await supabase
    .from("silos")
    .select("*, teams!inner(id)")
    .order("created_at", { ascending: true })
    .eq("teams.id", teamId)

  return silos ?? []
}
