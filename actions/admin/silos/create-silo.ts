"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Silo } from "@/types/types"

export const createSilo = async (inputs: Omit<Silo, "id" | "created_at">) => {
  const supabase = createAdminSupabaseClient()
  const { data } = await supabase.from("silos").insert(inputs).select().single()

  return data
}
