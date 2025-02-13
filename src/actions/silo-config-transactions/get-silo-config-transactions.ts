"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { SilosConfigTransaction } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const getSiloConfigTransactions = async (
  siloId: number,
): Promise<SilosConfigTransaction[]> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("silo_config_transactions")
    .select("*")
    .order("id", { ascending: true })
    .eq("silo_id", siloId)

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
