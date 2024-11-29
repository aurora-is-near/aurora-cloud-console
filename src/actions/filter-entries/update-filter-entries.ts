"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { FilterEntry } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const updateFilterEntries = async ({
  filter_id,
  items,
}: {
  filter_id: number
  items: Omit<FilterEntry, "filter_id" | "id">[]
}) => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("filter_entries")
    .upsert(
      items.map((item) => ({ ...item, filter_id })),
      {
        onConflict: "value",
      },
    )
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
