"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const removeTeamsFromSilo = async (siloId: number) => {
  const supabase = createAdminSupabaseClient()

  await supabase.from("silos_teams").delete().eq("silo_id", siloId)
}
