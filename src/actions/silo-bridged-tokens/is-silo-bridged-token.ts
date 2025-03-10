"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const isSiloBridgedToken = async (
  siloId: number,
  tokenId: number,
): Promise<boolean> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("silo_bridged_tokens")
    .select("bridged_token_id")
    .eq("silo_id", siloId)
    .eq("bridged_token_id", tokenId)
    .maybeSingle()

  assertValidSupabaseResult(result)

  return !!result.data
}
