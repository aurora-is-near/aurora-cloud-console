"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Limit } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const createLimit = async (
  inputs: Pick<
    Limit,
    "limit_scope" | "limit_type" | "limit_value" | "duration" | "deal_id"
  >,
): Promise<Limit> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("limits")
    .insert({
      limit_scope: inputs.limit_scope,
      limit_type: inputs.limit_type,
      limit_value: inputs.limit_value,
      duration: inputs.duration,
      deal_id: inputs.deal_id,
      ui_enabled: true,
    })
    .select("*")
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
