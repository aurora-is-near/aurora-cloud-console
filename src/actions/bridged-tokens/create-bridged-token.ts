"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { BridgedToken } from "@/types/types"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const createBridgedToken = async (
  inputs: Omit<BridgedToken, "id" | "created_at">,
): Promise<void> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase.from("bridged_tokens").insert(inputs)

  assertValidSupabaseResult(result)
}
