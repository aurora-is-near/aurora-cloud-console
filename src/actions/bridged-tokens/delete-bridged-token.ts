"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const deleteBridgedToken = async (id: number) => {
  const supabase = createAdminSupabaseClient()

  const result = await supabase.from("bridged_tokens").delete().eq("id", id)

  assertValidSupabaseResult(result)
}
