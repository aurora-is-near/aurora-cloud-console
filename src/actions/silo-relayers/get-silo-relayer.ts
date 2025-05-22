"use server"

import { assertValidSupabaseResult } from "@/utils/supabase"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import type { Silo, SiloRelayer } from "@/types/types"

export const getSiloRelayer = async (
  silo: Silo,
): Promise<SiloRelayer | null> => {
  const supabase = createAdminSupabaseClient()
  const siloRelayerId = `relay.${silo.engine_account}`
  const result = await supabase
    .from("silo_relayers")
    .select("*")
    .eq("account_id", siloRelayerId)
    .maybeSingle()

  if (!result.data) {
    return null
  }

  assertValidSupabaseResult(result)

  return result.data
}
