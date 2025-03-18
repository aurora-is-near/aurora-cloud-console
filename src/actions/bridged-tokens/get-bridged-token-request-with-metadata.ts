"use server"

import { BridgedTokenRequest, Silo } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const getBridgedTokenRequestWithSilo = async (
  id: number,
): Promise<(BridgedTokenRequest & { silo: Silo }) | null> => {
  const supabase = createAdminSupabaseClient()

  const result = await supabase
    .from("bridged_token_requests")
    .select("*, silos(*)")
    .eq("id", id)
    .maybeSingle()

  assertValidSupabaseResult(result)

  if (!result.data) {
    return null
  }

  const { silos, ...bridgedTokenRequest } = result.data

  return {
    ...bridgedTokenRequest,
    silo: silos,
  }
}
