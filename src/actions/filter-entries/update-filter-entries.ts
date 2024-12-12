"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const updateFilterEntries = async ({
  deal_id,
  filter_id,
  items,
}: {
  deal_id: number
  filter_id: number
  items: { value: string }[]
}) => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("filter_entries")
    .upsert(
      items.map((item) => ({ ...item, filter_id, deal_id })),
      {
        onConflict: "value",
      },
    )
    .select()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
