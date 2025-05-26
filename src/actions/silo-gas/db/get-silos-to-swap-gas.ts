"use server"

import type { PostgrestSingleResponse } from "@supabase/supabase-js"
import { notReachable } from "@/utils/notReachable"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"
import type { Silo, SiloGasSwap } from "@/types/types"

import { GAS_SWAP_TRANSACTION_TIME_BOUNDARY } from "../constants"

export const getSilosToSwapGas = async (
  variant: SiloGasSwap["variant"],
): Promise<Silo[]> => {
  const supabase = createAdminSupabaseClient()
  let result: PostgrestSingleResponse<Silo[]>

  switch (variant) {
    // 1. There are no gas swap records for this silo, OR
    // 2. All gas swap records have status "SUCCEED" AND the most recent one is older than 1 hour ago
    case "TO_RELAYER":
      result = await supabase
        .from("silos")
        .select("*")
        .or(
          `
        not.exists(silo_gas_swaps!inner(silo_id.eq.id)),
        and(
          not.exists(silo_gas_swaps!inner(silo_id.eq.id,status.neq.SUCCEED)),
          exists(silo_gas_swaps!inner(silo_id.eq.id,status.eq.SUCCEED,created_at.lt.${GAS_SWAP_TRANSACTION_TIME_BOUNDARY}))
        )
      `,
        )
        .order("id")
      break

    // 1. There is a successful gas swap to relayer
    // 2. And burn gas swap is not registered or failed
    case "BURN":
      result = await supabase
        .from("silos")
        .select("*")
        .or(
          `
            and(
              exists(
                silo_gas_swaps!inner(
                  silo_id.eq.id,
                  status.eq.SUCCEED,
                  variant.eq.TO_RELAYER,
                  created_at.gt.${GAS_SWAP_TRANSACTION_TIME_BOUNDARY}
                )
              ),
              or(
                not.exists(
                  silo_gas_swaps!inner(
                    silo_id.eq.id,
                    variant.eq.BURN,
                    created_at.gt.${GAS_SWAP_TRANSACTION_TIME_BOUNDARY}
                  )
                ),
                exists(
                  silo_gas_swaps!inner(
                    silo_id.eq.id,
                    variant.eq.BURN,
                    status.eq.FAILED,
                    created_at.gt.${GAS_SWAP_TRANSACTION_TIME_BOUNDARY}
                  )
                )
              )
            )
          `,
        )
        .order("id")
      break
    default:
      notReachable(variant)
  }

  assertValidSupabaseResult(result)

  return result.data || []
}
