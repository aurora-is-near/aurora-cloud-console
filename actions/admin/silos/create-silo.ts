"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Silo } from "@/types/types"

export const createSilo = async (
  inputs: Omit<Silo, "id" | "created_at">,
): Promise<Silo> => {
  const supabase = createAdminSupabaseClient()
  const { data, error } = await supabase
    .from("silos")
    .insert(inputs)
    .select()
    .single()

  if (error) {
    throw error
  }

  if (!data) {
    throw new Error("No data returned when creating silo")
  }

  return data
}
