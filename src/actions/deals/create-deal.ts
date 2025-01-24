"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Deal } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const createDeal = async (
  inputs: Pick<Deal, "name" | "team_id">,
): Promise<Deal> => {
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

  return result.data
}
