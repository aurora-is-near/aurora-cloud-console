"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Silo } from "@/types/types"

export const updateSilo = async (
  id: number,
  inputs: Omit<Silo, "id" | "created_at" | "team" | "tokens">,
): Promise<Silo> => {
  const supabase = createAdminSupabaseClient()
  const { data, error } = await supabase
    .from("silos")
    .update(inputs)
    .eq("id", id)
    .select()
    .single()

  if (error) {
    throw error
  }

  if (!data) {
    throw new Error("No data returned when updating silo")
  }

  return data
}
