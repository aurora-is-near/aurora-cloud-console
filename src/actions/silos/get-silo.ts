"use server"

import { Silo } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getSilo = async (id: number): Promise<Silo | null> => {
  const supabase = createAdminSupabaseClient()

  const { data: silo } = await supabase
    .from("silos")
    .select("*")
    .eq("id", id)
    .is("deleted_at", null)
    .maybeSingle()

  return silo
}
