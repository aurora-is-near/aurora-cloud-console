"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getToken = async (id: number) => {
  const supabase = createAdminSupabaseClient()
  const { data } = await supabase
    .from("tokens")
    .select("*")
    .eq("id", id)
    .single()

  return data
}
