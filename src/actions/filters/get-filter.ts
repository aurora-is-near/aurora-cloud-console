"use server"

import { Filter } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getFilter = async (id: number): Promise<Filter | null> => {
  const supabase = createAdminSupabaseClient()

  const { data } = await supabase
    .from("filters")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  return data
}
