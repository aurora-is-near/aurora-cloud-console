"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { SiloBridgedTokenRequest } from "@/types/types"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const createSiloBridgedTokenRequest = async (
  inputs: Omit<SiloBridgedTokenRequest, "id" | "created_at">,
): Promise<void> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase.from("bridged_token_requests").insert(inputs)

  assertValidSupabaseResult(result)
}
