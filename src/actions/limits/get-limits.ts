"use server"

import { Limit } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getLimits = async (dealId: number): Promise<Limit[]> => {
  const supabase = createAdminSupabaseClient()
  const { data: limits } = await supabase
    .from("limits")
    .select("*")
    .order("id", { ascending: true })
    .eq("deal_id", dealId)
    .is("deleted_at", null)

  return limits ?? []
}
