"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"
import type { SiloGasSwap } from "@/types/types"

export const createGasSwapTransaction = async (
  inputs: Omit<SiloGasSwap, "id" | "created_at">,
): Promise<SiloGasSwap> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("silo_gas_swaps")
    .insert(inputs)
    .select()
    .single()

  assertValidSupabaseResult(result)

  return result.data
}
