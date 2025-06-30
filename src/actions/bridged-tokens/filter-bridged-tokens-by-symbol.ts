"use server"

import { BridgedToken } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const filterBridgedTokensBySymbol = async (
  symbols: string[],
): Promise<BridgedToken[]> => {
  const supabase = createAdminSupabaseClient()

  const filters = symbols
    .map((symbol) => `symbol.ilike.${symbol.toUpperCase()}`)
    .join(",")

  const result = await supabase.from("bridged_tokens").select("*").or(filters)

  assertValidSupabaseResult(result)

  return result.data
}
