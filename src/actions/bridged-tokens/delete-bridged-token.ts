"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const deleteBridgedToken = async (id: number) => {
  const supabase = createAdminSupabaseClient()

  await supabase.from("bridged_tokens").delete().eq("id", id)
}
