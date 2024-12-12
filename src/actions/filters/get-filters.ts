"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Filter } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const getFilters = async (deal_id: number): Promise<Filter[]> => {
  const supabase = createAdminSupabaseClient()

  const result = await supabase
    .from("filters")
    .select("*")
    .eq("deal_id", deal_id)

  assertNonNullSupabaseResult(result)
  assertValidSupabaseResult(result)

  return result.data
}
