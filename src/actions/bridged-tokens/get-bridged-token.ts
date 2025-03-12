"use server"

import { BridgedToken } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getBridgedToken = async (
  id: number,
): Promise<BridgedToken | null> => {
  const supabase = createAdminSupabaseClient()

  const { data } = await supabase
    .from("bridged_tokens")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  return data
}
