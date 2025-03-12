"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Silo } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertUniqueChainIdNotViolated,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const requestIntentsIntegration = async (id: number): Promise<Silo> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("silos")
    .update({ intents_integration_status: "REQUESTED" })
    .eq("id", id)
    .select()
    .single()

  assertUniqueChainIdNotViolated(result)
  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
