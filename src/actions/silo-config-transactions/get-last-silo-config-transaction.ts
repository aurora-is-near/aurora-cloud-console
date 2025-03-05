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

export const getLastSiloConfigTransaction = async (
  siloId: number,
  operation: SiloConfigTransactionOperation,
): Promise<SiloConfigTransaction | null> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("silo_config_transactions")
    .select("*")
    .order("id", { ascending: false })
    .eq("silo_id", siloId)
    .eq("operation", operation)
    .limit(1)
    .maybeSingle()

  assertValidSupabaseResult(result)

  return result.data
}
