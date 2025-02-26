"use server"

import { Silo } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getSilos = async (): Promise<Silo[]> => {
  const supabase = createAdminSupabaseClient()

  const { data: silo } = await supabase
    .from("silos")
    .select("*")
    .is("deleted_at", null)
    .order("id", { ascending: true })

  return silo ?? []
}
