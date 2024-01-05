"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getTeams = async () => {
  const supabase = createAdminSupabaseClient()
  const { data } = await supabase.from("teams").select("*")

  return data ?? []
}
