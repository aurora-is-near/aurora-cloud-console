"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Bridge, BridgeNetworkType } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const updateSiloBridge = async (
  siloId: number,
  inputs: {
    fromNetworks?: BridgeNetworkType[]
    toNetworks?: BridgeNetworkType[]
  },
): Promise<Bridge> => {
  const supabase = createAdminSupabaseClient()

  const result = await supabase
    .from("bridges")
    .update({
      from_networks: inputs.fromNetworks,
      to_networks: inputs.toNetworks,
    })
    .eq("silo_id", siloId)
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
