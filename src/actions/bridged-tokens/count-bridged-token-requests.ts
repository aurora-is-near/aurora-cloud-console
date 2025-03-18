"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const countBridgedTokenRequests = async (): Promise<number> => {
  const supabase = createAdminSupabaseClient()

  const result = await supabase
    .from("bridged_token_requests")
    .select("id", { count: "exact" })
    .is("resolved_at", null)

  assertValidSupabaseResult(result)

  return result.data.length
}
