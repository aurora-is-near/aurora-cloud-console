"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { SiloConfigTransaction } from "@/types/types"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const createSiloConfigTransaction = async (
  inputs: Omit<SiloConfigTransaction, "id" | "created_at">,
): Promise<SiloConfigTransaction> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("silo_config_transactions")
    .insert(inputs)
    .select()
    .single()

  assertValidSupabaseResult(result)

  return result.data
}
