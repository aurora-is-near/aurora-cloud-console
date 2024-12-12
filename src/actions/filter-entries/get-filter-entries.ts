"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { FilterEntry } from "@/types/types"

export const getFilterEntries = async (
  deal_id: number,
  filter_id: number,
): Promise<FilterEntry[] | null> => {
  const supabase = createAdminSupabaseClient()

  const { data } = await supabase
    .from("filter_entries")
    .select("*")
    .eq("filter_id", filter_id)
    .eq("deal_id", deal_id)

  return data
}
