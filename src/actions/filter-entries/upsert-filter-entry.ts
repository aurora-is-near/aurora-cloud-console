"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { FilterEntry } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const upsertFilterEntry = async (input: Omit<FilterEntry, "id">) => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("filter_entries")
    .upsert(input, {
      onConflict: "value",
    })
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
