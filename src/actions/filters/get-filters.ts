"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Filter } from "@/types/types"

export const getFilters = async (deal_id: number): Promise<Filter[] | null> => {
  const supabase = createAdminSupabaseClient()

  const { data: filters } = await supabase
    .from("filters")
    .select("*")
    .eq("deal_id", deal_id)

  return filters
}
