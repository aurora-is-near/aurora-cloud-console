"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Team } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const updateTeam = async (
  id: number,
  inputs: Omit<Team, "id" | "created_at">,
): Promise<Team> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("teams")
    .update(inputs)
    .eq("id", id)
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
