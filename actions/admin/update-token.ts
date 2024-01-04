"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

type Inputs = {
  name: string
}

export const updateToken = async (tokenId: number, inputs: Inputs) => {
  const supabase = createAdminSupabaseClient()
  const { data } = await supabase
    .from("tokens")
    .update(inputs)
    .eq("id", tokenId)
    .single()

  return data
}
