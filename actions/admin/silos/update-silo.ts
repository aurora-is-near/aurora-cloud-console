"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Silo } from "@/types/types"

export const updateSilo = async (
  id: number,
  inputs: Omit<Silo, "id" | "created_at">,
) => {
  const supabase = createAdminSupabaseClient()
  const { data } = await supabase
    .from("silos")
    .update(inputs)
    .eq("id", id)
    .single()

  return data
}
