"use server"

import { Widget } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getWidget = async (siloId: number): Promise<Widget | null> => {
  const supabase = createAdminSupabaseClient()
  const { data } = await supabase
    .from("widgets")
    .select("*")
    .eq("silo_id", siloId)
    .maybeSingle()

  return data
}
