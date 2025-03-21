"use server"

import { Limit, LimitScope, LimitType } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const updateLimit = async (
  dealId: number,
  limitValue: number | null,
  limitScope: LimitScope,
  limitType: LimitType,
  duration: string,
): Promise<Limit> => {
  const supabase = createAdminSupabaseClient()

  const result = await supabase
    .from("limits")
    .upsert(
      {
        limit_value: Number(limitValue) > 0 ? Number(limitValue) : null,
        limit_scope: limitScope,
        limit_type: limitType,
        duration,
        deal_id: dealId,
        ui_enabled: true,
      },
      { onConflict: "limit_scope,limit_type,deal_id,ui_enabled" },
    )
    .select()
    .single()

  assertNonNullSupabaseResult(result)
  assertValidSupabaseResult(result)

  return result.data
}
