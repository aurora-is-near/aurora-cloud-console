"use server"

import { notReachable } from "@/utils/notReachable"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import type { Silo, SiloGasSwap } from "@/types/types"

import { GAS_SWAP_TRANSACTION_TIME_BOUNDARY } from "../constants"

export const getSilosToSwapGas = async (
  variant: SiloGasSwap["variant"],
): Promise<Silo[]> => {
  const supabase = createAdminSupabaseClient()

  switch (variant) {
    // 1. There are no gas swap records for this silo, OR
    // 2. All gas swap records have status "SUCCEED" AND the most recent one is older than 1 hour ago
    case "TO_RELAYER": {
      const { data, error } = await supabase.rpc(
        "get_silos_for_gas_swap_relayer",
        {
          boundary: GAS_SWAP_TRANSACTION_TIME_BOUNDARY,
        },
      )

      if (error) {
        throw error
      }

      return data || []
    }

    // 1. There is a successful gas swap to relayer
    // 2. And burn gas swap is not registered or failed
    case "BURN": {
      const { data, error } = await supabase.rpc("get_silos_for_gas_burn", {
        boundary: GAS_SWAP_TRANSACTION_TIME_BOUNDARY,
      })

      if (error) {
        throw error
      }

      return data || []
    }

    default:
      notReachable(variant)
  }
}
