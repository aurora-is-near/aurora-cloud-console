"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Token } from "@/types/types"

export const updateToken = async (
  tokenId: number,
  inputs: Omit<Token, "id" | "created_at">,
): Promise<Token> => {
  const supabase = createAdminSupabaseClient()
  const { data, error } = await supabase
    .from("tokens")
    .update(inputs)
    .eq("id", tokenId)
    .select()
    .single()

  if (error) {
    throw error
  }

  if (!data) {
    throw new Error("No data returned when updating token")
  }

  return data
}
