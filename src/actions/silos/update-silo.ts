"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Silo } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const updateSilo = async (
  id: number,
  inputs: Partial<Omit<Silo, "id" | "created_at" | "team" | "tokens">>,
): Promise<Silo> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("silos")
    .update(inputs)
    .eq("id", id)
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
