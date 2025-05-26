"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"
import type { SiloGasSwap } from "@/types/types"

export const updateGasSwapTransaction = async (
  id: number,
  inputs: Partial<Omit<SiloGasSwap, "id" | "created_at">>,
): Promise<void> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("silo_gas_swaps")
    .update(inputs)
    .eq("id", id)

  assertValidSupabaseResult(result)
}
