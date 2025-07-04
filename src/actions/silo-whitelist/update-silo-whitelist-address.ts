"use server"

import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import type { SiloWhitelistAddress } from "@/types/types"

export const updateSiloWhitelistAddress = async (
  address: string,
  inputs:
    | Pick<SiloWhitelistAddress, "is_applied" | "list">
    | Pick<SiloWhitelistAddress, "remove_tx_id" | "list">,
): Promise<SiloWhitelistAddress | null> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("silo_whitelist_addresses")
    .update(inputs)
    .eq("address", address)
    .eq("list", inputs.list)
    .select("*")
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
