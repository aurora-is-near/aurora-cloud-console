"use server"

import { Token } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getSiloTokens = async (siloId: number): Promise<Token[]> => {
  const supabase = createAdminSupabaseClient()
  const { data: tokens } = await supabase
    .from("tokens")
    .select("*")
    .eq("silo_id", siloId)
    .order("id", { ascending: true })

  return tokens ?? []
}
