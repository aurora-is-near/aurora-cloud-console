"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import {
  SiloConfigTransaction,
  SiloConfigTransactionOperation,
} from "@/types/types"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const getSiloConfigTransactionById = async (
  siloId: number,
  operation: SiloConfigTransactionOperation,
  txId: number,
): Promise<SiloConfigTransaction | null> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("silo_config_transactions")
    .select("*")
    .order("id", { ascending: false })
    .eq("id", txId)
    .eq("silo_id", siloId)
    .eq("operation", operation)
    .limit(1)
    .maybeSingle()

  assertValidSupabaseResult(result)

  return result.data
}
