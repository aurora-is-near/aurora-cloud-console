"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Token } from "@/types/types"

export const getToken = async (id: number): Promise<Token | null> => {
  const supabase = createAdminSupabaseClient()
  const { data } = await supabase
    .from("tokens")
    .select("*")
    .eq("id", id)
    .single()

  return data
}
