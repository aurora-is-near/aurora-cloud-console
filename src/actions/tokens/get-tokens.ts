"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Token } from "@/types/types"

export const getTokens = async (): Promise<Token[]> => {
  const supabase = createAdminSupabaseClient()
  const { data } = await supabase
    .from("tokens")
    .select("*")
    .order("id", { ascending: true })

  return data ?? []
}
