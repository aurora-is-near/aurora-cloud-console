"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Team } from "@/types/types"
import { createCustomer } from "@/utils/proxy-api/create-customer"
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

  await createCustomer(result.data.id)

  return result.data
}
