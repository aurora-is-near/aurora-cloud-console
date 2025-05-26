"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"
import type { Silo } from "@/types/types"

import { GAS_SWAP_TRANSACTION_TIME_BOUNDARY } from "../constants"

export const getSilosToCheckSwapStatus = async (): Promise<Silo[]> => {
  const supabase = createAdminSupabaseClient()

  const result = await supabase
    .from("silos")
    .select("*")
    .or(
      `
        exists(
          silo_gas_swaps!inner(
            silo_id.eq.id,
            status.eq.PENDING,
            created_at.gt.${GAS_SWAP_TRANSACTION_TIME_BOUNDARY}
          )
        ),
        exists(
          silo_gas_swaps!inner(
            silo_id.eq.id,
            status.eq.INITIATED,
            created_at.gt.${GAS_SWAP_TRANSACTION_TIME_BOUNDARY}
          )
        )
      `,
    )

  assertValidSupabaseResult(result)
  return result.data || []
}
