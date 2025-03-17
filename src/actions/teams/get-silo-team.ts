"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Team } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const getSiloTeam = async (siloId: number): Promise<Team> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("teams")
    .select("*, silos_teams!inner(team_id)")
    .order("id", { ascending: true })
    .eq("silos_teams.silo_id", siloId)
    .is("deleted_at", null)
    .single()

  assertNonNullSupabaseResult(result)
  assertValidSupabaseResult(result)

  return result.data
}
