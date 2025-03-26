"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { SiloConfigTransaction } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const getPendingSiloConfigTransactions = async (
  siloId: number,
): Promise<SiloConfigTransaction[]> => {
  const supabase = createAdminSupabaseClient()
  const query = supabase
    .from("silo_config_transactions")
    .select("*")
    .order("id", { ascending: true })
    .eq("silo_id", siloId)
    .eq("status", "PENDING")

  const result = await query

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
