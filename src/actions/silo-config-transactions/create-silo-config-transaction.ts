"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { SiloConfigTransaction } from "@/types/types"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const createSiloConfigTransaction = async (
  inputs: Omit<SiloConfigTransaction, "id" | "created_at">,
): Promise<void> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase.from("silo_config_transactions").insert(inputs)

  assertValidSupabaseResult(result)
}
