"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Token } from "@/types/types"

export const createToken = async (inputs: Omit<Token, "id" | "created_at">) => {
  const supabase = createAdminSupabaseClient()
  const { data } = await supabase
    .from("tokens")
    .insert(inputs)
    .select()
    .single()

  return data
}
