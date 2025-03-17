"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { SiloBridgedToken } from "@/types/types"
import { adaptSiloBridgedToken } from "@/utils/adapters"

export const getSiloBridgedTokens = async (
  siloId: number,
): Promise<SiloBridgedToken[]> => {
  const supabase = createAdminSupabaseClient()
  const { data } = await supabase
    .from("bridged_tokens")
    .select("*, silo_bridged_tokens!inner(*)")
    .eq("silo_bridged_tokens.silo_id", siloId)
    .order("id", { ascending: true })

  return (data ?? [])
    .map((token) => adaptSiloBridgedToken(siloId, token))
    .filter((item): item is SiloBridgedToken => item !== null)
}
