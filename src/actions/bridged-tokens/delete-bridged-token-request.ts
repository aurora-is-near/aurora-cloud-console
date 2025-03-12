"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const deleteBridgedTokenRequest = async (id: number): Promise<void> => {
  const supabase = createAdminSupabaseClient()

  const result = await supabase
    .from("bridged_token_requests")
    .delete()
    .eq("id", id)

  assertValidSupabaseResult(result)
}
