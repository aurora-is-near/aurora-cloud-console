"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Token } from "@/types/types"

export const updateToken = async (
  tokenId: number,
  inputs: Omit<Token, "id" | "created_at">,
) => {
  const supabase = createAdminSupabaseClient()
  const { data } = await supabase
    .from("tokens")
    .update(inputs)
    .eq("id", tokenId)
    .single()

  return data
}
