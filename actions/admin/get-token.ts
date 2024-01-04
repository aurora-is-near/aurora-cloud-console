"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getToken = async (tokenId: number) => {
  const supabase = createAdminSupabaseClient()
  const { data } = await supabase
    .from("tokens")
    .select("*")
    .eq("id", tokenId)
    .single()

  return data
}
