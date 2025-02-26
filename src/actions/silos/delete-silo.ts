"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const deleteSilo = async (id: number) => {
  const supabase = createAdminSupabaseClient()

  await supabase
    .from("silos")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id)
}
