"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const deleteBlockscoutDatabase = async (id: number) => {
  const supabase = createAdminSupabaseClient()

  await supabase.from("blockscout_databases").delete().eq("id", id)
}
