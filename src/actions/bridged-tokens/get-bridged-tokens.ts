"use server"

import { BridgedToken } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getBridgedTokens = async (): Promise<BridgedToken[]> => {
  const supabase = createAdminSupabaseClient()

  const { data } = await supabase
    .from("bridged_tokens")
    .select("*")
    .order("id", { ascending: true })

  return data ?? []
}
