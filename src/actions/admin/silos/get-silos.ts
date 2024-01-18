"use server"

import { Silo } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getSilos = async (): Promise<Silo[]> => {
  const supabase = createAdminSupabaseClient()

  const { data: silos } = await supabase
    .from("silos")
    .select()
    .order("created_at", { ascending: true })

  return silos ?? []
}
