"use server"

import { BridgedTokenRequest } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const getBridgedTokenRequest = async (
  id: number,
): Promise<BridgedTokenRequest | null> => {
  const supabase = createAdminSupabaseClient()

  const result = await supabase
    .from("bridged_token_requests")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  assertValidSupabaseResult(result)

  return result.data
}
