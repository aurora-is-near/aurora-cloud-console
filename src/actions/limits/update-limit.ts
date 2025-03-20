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
  limitValue: number | null,
): Promise<Limit> => {
  const supabase = createAdminSupabaseClient()

  console.log(
    "limitValue",
    typeof limitValue,
    `Limit:${limitValue}:`,
    Number(limitValue),
  )
  const result = await supabase
    .from("limits")
    .update({
      limit_value: Number(limitValue) > 0 ? Number(limitValue) : null,
    })
    .eq("id", limitId)
    .eq("deal_id", dealId)
    .select()
    .single()

  assertNonNullSupabaseResult(result)
  assertValidSupabaseResult(result)

  return result.data
}
