"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Silo } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const updateSiloGasPrice = async (
  id: number,
  inputs: Omit<
    Deal,
    | "id"
    | "demo_key"
    | "team_id"
    | "silo_id"
    | "created_at"
    | "updated_at"
    | "deleted_at"
  >,
): Promise<Deal> => {
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
