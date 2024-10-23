"use server"

import { Widget } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getWidget = async (id: number): Promise<Widget | null> => {
  const supabase = createAdminSupabaseClient()
  const { data } = await supabase
    .from("widgets")
    .select("*")
    .eq("silo_id", id)
    .maybeSingle()

  return data
}
