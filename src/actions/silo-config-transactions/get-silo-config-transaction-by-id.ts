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

export const getSiloConfigTransactionById = async (
  txId: number,
  siloId: number,
  operation: SiloConfigTransactionOperation,
): Promise<SiloConfigTransaction> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("silo_config_transactions")
    .select("*")
    .order("id", { ascending: true })
    .eq("id", txId)
    .eq("silo_id", siloId)
    .eq("operation", operation)
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
