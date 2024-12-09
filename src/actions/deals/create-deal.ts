"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Deal } from "@/types/types"
import {
  abortIfNoSupabaseResult,
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

/**
 * Create a deal via the ACC database and Proxy API.
 * @see https://github.com/aurora-is-near/bb-rules/tree/acc-deal/docs/acc#creating-a-deal
 */
export const createDeal = async (inputs: {
  name: string
  team_id: number
}): Promise<Deal> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("deals")
    .insert({
      name: inputs.name,
      team_id: inputs.team_id,
    })
    .select("*, teams!inner(id)")
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  if (!result.data.teams) {
    throw new Error("No team found")
  }

  abortIfNoSupabaseResult(404, result)

  return result.data
}
