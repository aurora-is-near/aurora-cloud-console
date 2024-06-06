"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Oracle } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const createSiloOracle = async (inputs: {
  silo_id: number
}): Promise<Oracle> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase.from("oracles").insert(inputs).select().single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
