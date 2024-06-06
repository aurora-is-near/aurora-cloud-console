"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const deleteApiKey = async (id: number) => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase.from("api_keys").delete().eq("id", id)

  assertValidSupabaseResult(result)
}
