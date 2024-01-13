"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Token } from "@/types/types"

export const createToken = async (
  inputs: Omit<Token, "id" | "created_at">,
): Promise<Token> => {
  const supabase = createAdminSupabaseClient()
  const { data, error } = await supabase
    .from("tokens")
    .insert(inputs)
    .select()
    .single()

  if (error) {
    throw error
  }

  if (!data) {
    throw new Error("No data returned when creating token")
  }

  return data
}
