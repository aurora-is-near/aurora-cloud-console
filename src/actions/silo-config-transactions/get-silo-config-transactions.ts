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
  operations: SiloConfigTransactionOperation[],
  nearAccountId?: string | null,
): Promise<SiloConfigTransaction[]> => {
  const supabase = createAdminSupabaseClient()
  const query = supabase
    .from("silo_config_transactions")
    .select("*")
    .order("id", { ascending: true })
    .eq("silo_id", siloId)
    .in("operation", operations)

  if (nearAccountId) {
    void query.eq("target", nearAccountId)
  }

  const result = await query

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
