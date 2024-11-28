"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Tables } from "@/types/supabase"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const updateFilter = async (
  input: Omit<Tables<"filters">, "id" | "created_at">,
) => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("filters")
    .upsert(input, {
      onConflict: "deal_id,filter_type,blacklist",
    })
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
