"use server"

import { Deal } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getDeals = async (): Promise<Deal[]> => {
  const supabase = createAdminSupabaseClient()

  const { data: deals } = await supabase
    .from("deals")
    .select()
    .order("created_at", { ascending: false })

  return deals ?? []
}
