"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Team } from "@/types/types"
import { assertNonNullSupabaseResult } from "@/utils/supabase"

export const getTeam = async (teamKey: string): Promise<Team> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("teams")
    .select("*")
    .eq("team_key", teamKey)
    .single()

  assertNonNullSupabaseResult(result)

  return result.data
}
