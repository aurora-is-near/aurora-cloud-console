"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Team } from "@/types/types"
import { assertNonNullSupabaseResult } from "@/utils/supabase"

export const getTeam = async (id: number): Promise<Team> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase.from("teams").select("*").eq("id", id).single()

  assertNonNullSupabaseResult(result)

  return result.data
}
