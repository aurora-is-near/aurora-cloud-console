"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const deleteFilterEntry = async (filter_id: number, id: number) => {
  const supabase = createAdminSupabaseClient()

  await supabase
    .from("filter_entries")
    .delete()
    .eq("filter_id", filter_id)
    .eq("id", id)
}
