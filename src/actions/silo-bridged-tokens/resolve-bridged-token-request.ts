"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const resolveBridgedTokenRequest = async (id: number): Promise<void> => {
  const supabase = createAdminSupabaseClient()

  const result = await supabase
    .from("bridged_token_requests")
    .update({
      resolved_at: new Date().toISOString(),
    })
    .eq("id", id)

  assertValidSupabaseResult(result)
}
