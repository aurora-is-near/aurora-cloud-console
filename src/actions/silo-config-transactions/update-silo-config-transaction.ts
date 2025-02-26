"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { SiloConfigTransaction } from "@/types/types"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const updateSiloConfigTransaction = async (
  id: number,
  inputs: Partial<Omit<SiloConfigTransaction, "id" | "created_at">>,
): Promise<void> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("silo_config_transactions")
    .update(inputs)
    .eq("id", id)

  assertValidSupabaseResult(result)
}
