"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getSilos = async () => {
  const supabase = createAdminSupabaseClient()
  const { data } = await supabase.from("silos").select("*")

  return data ?? []
}
