"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { SiloBridgedToken } from "@/types/types"
import { adaptSiloBridgedToken } from "@/utils/adapters"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const getSiloBridgedToken = async (
  siloId: number,
  tokenId: number,
): Promise<SiloBridgedToken | null> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("bridged_tokens")
    .select("*, silo_bridged_tokens!inner(*)")
    .eq("silo_bridged_tokens.silo_id", siloId)
    .eq("bridged_token_id", tokenId)
    .maybeSingle()

  assertValidSupabaseResult(result)

  if (!result.data) {
    return null
  }

  return adaptSiloBridgedToken(siloId, result.data)
}
