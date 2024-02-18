"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const deleteToken = async (id: number) => {
  const supabase = createAdminSupabaseClient()

  await supabase.from("tokens").delete().eq("id", id)
}
