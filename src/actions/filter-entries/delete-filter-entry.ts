"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const deleteFilterEntry = async (
  deal_id: number,
  filter_id: number,
  id: number,
) => {
  const supabase = createAdminSupabaseClient()

  await supabase
    .from("filter_entries")
    .delete()
    .eq("filter_id", filter_id)
    .eq("id", id)
    .filter(
      "filter_id",
      "in",
      supabase.from("filters").select("id").eq("deal_id", deal_id),
    )
}
