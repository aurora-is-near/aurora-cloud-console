"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getTeam = async (id: number) => {
  const supabase = createAdminSupabaseClient()
  const { data } = await supabase
    .from("teams")
    .select("*")
    .eq("id", id)
    .single()

  return data
}
