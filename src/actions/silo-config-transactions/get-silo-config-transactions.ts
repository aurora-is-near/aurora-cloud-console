"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import {
  SiloConfigTransaction,
  SiloConfigTransactionOperation,
} from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const getSiloConfigTransactions = async (
  siloId: number,
  operation?: SiloConfigTransactionOperation,
): Promise<SiloConfigTransaction[]> => {
  const supabase = createAdminSupabaseClient()
  const query = supabase
    .from("silo_config_transactions")
    .select("*")
    .order("id", { ascending: true })
    .eq("silo_id", siloId)

  if (operation) {
    void query.eq("operation", operation)
  }

  const result = await query

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
