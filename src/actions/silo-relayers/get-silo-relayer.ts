"use server"

import { assertValidSupabaseResult } from "@/utils/supabase"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import type { SiloRelayer } from "@/types/types"

export const getSiloRelayer = async (
  siloId: number,
): Promise<SiloRelayer | null> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("silo_relayers")
    .select("*")
    .eq("silo_id", siloId)
    .maybeSingle()

  if (!result.data) {
    return null
  }

  assertValidSupabaseResult(result)

  return result.data
}
