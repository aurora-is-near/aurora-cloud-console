"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { BridgedToken } from "@/types/types"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const updateBridgedToken = async (
  tokenId: number,
  inputs: Partial<Omit<BridgedToken, "id" | "created_at">>,
): Promise<void> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("bridged_tokens")
    .update(inputs)
    .eq("id", tokenId)

  assertValidSupabaseResult(result)
}
