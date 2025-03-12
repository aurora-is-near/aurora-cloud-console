"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Team } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const createTeam = async (
  inputs: Omit<Team, "id" | "created_at">,
): Promise<Team> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase.from("teams").insert(inputs).select().single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
