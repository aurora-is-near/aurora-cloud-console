"use server"

import { Deal } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getDeal = async (id: number): Promise<Deal | null> => {
  const supabase = createAdminSupabaseClient()

  const result = await supabase.from("deals").select("*").eq("id", id).single()

  return result.data
}
