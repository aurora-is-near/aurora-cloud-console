"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Token } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const updateToken = async (
  tokenId: number,
  inputs: Omit<Token, "id" | "created_at">,
): Promise<Token> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("tokens")
    .update(inputs)
    .eq("id", tokenId)
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
