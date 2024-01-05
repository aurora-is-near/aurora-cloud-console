"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getSilo = async (id: number) => {
  const supabase = createAdminSupabaseClient()
  const { data } = await supabase
    .from("silos")
    .select("*")
    .eq("id", id)
    .single()

  return data
}
