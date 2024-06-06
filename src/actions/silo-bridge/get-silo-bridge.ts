"use server"

import { Bridge } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getSiloBridge = async (id: number): Promise<Bridge | null> => {
  const supabase = createAdminSupabaseClient()
  const { data: bridge } = await supabase
    .from("bridges")
    .select("*")
    .eq("silo_id", id)
    .maybeSingle()

  return bridge
}
