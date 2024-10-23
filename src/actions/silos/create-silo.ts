"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Silo } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const createSilo = async (
  inputs: Omit<Silo, "id" | "created_at" | "updated_at">,
): Promise<Silo> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase.from("silos").insert(inputs).select().single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
