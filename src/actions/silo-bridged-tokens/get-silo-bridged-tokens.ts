"use server"

import { SiloBridgedToken } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getSiloBridgedTokens = async (
  siloId: number,
): Promise<SiloBridgedToken[]> => {
  const supabase = createAdminSupabaseClient()
  const { data } = await supabase
    .from("bridged_tokens")
    .select("*, silo_bridged_tokens!inner(*)")
    .eq("silo_bridged_tokens.silo_id", siloId)
    .order("id", { ascending: true })

  return (data ?? []).map((token) => {
    const bridgedTokenMeta = token.silo_bridged_tokens.find(
      (siloBridgedToken) => siloBridgedToken.silo_id === siloId,
    )

    // Given the database query above, this should be impossible
    if (!bridgedTokenMeta) {
      throw new Error("Bridged token metadata not found")
    }

    return {
      ...token,
      is_deployment_pending: bridgedTokenMeta.is_deployment_pending,
    }
  })
}
