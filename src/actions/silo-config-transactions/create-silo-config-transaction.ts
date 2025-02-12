"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { SilosConfigTransaction } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const createSiloConfigTransaction = async (
  inputs: Omit<SilosConfigTransaction, "id" | "created_at">,
): Promise<SilosConfigTransaction> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("silo_config_transactions")
    .insert(inputs)
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
