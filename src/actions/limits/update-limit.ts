"use server"

import { Limit } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const updateLimit = async (
  dealId: number,
  limitId: number,
  limitValue: number,
): Promise<Limit> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("limits")
    .update({
      limit_value: limitValue,
    })
    .eq("id", limitId)
    .eq("deal_id", dealId)
    .select()
    .single()

  assertNonNullSupabaseResult(result)
  assertValidSupabaseResult(result)

  return result.data
}
