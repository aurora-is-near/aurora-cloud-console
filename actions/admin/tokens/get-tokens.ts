"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getTokens = async () => {
  const supabase = createAdminSupabaseClient()
  const { data } = await supabase.from("tokens").select("*")

  return data ?? []
}
