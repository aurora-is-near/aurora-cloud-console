"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"
import type { Silo } from "@/types/types"

import { GAS_SWAP_TRANSACTION_TIME_BOUNDARY } from "../constants"

export const getSilosToCheckSwapStatus = async (): Promise<Silo[]> => {
  const supabase = createAdminSupabaseClient()
  const { data, error } = await supabase.rpc("get_silos_to_get_swap_status", {
    boundary: GAS_SWAP_TRANSACTION_TIME_BOUNDARY,
  })

  if (error) {
    throw error
  }

  return data || []
}
