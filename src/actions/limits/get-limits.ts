"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Limit } from "@/types/types"

export const getLimits = async (deal_id: number): Promise<Limit[] | null> => {
  const supabase = createAdminSupabaseClient()

  const result = await supabase
    .from("limits")
    .select("*")
    .eq("deal_id", deal_id)

  return result.data
}
