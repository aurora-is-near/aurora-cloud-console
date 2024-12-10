"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Filter, FilterType } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const createFilter = async (
  deal_id: number,
  filter_type: FilterType,
): Promise<Filter> => {
  const supabase = createAdminSupabaseClient()

  const result = await supabase
    .from("filters")
    .upsert({
      deal_id,
      filter_type,
    })
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
