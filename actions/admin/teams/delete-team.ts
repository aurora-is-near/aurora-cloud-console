"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const deleteTeam = async (id: number) => {
  const supabase = createAdminSupabaseClient()

  await supabase.from("teams").delete().eq("id", id)
}
