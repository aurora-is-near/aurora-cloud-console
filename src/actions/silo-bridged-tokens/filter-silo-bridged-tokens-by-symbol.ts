"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { SiloBridgedToken } from "@/types/types"
import { adaptSiloBridgedToken } from "@/utils/adapters"

export const filterSiloBridgedTokensBySymbol = async (
  siloId: number,
  symbols: string[],
): Promise<SiloBridgedToken[]> => {
  const supabase = createAdminSupabaseClient()

  const filters = symbols
    .map((s) => `symbol.ilike.${s.toUpperCase()}`)
    .join(",")

  const { data } = await supabase
    .from("bridged_tokens")
    .select("*, silo_bridged_tokens!inner(*)")
    .eq("silo_bridged_tokens.silo_id", siloId)
    .or(filters)

  return (data ?? [])
    .map((token) => adaptSiloBridgedToken(siloId, token))
    .filter((item): item is SiloBridgedToken => item !== null)
}
