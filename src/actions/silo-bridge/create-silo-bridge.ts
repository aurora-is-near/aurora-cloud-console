"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Bridge } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const createSiloBridge = async (inputs: {
  silo_id: number
}): Promise<Bridge> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase.from("bridges").insert(inputs).select().single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
