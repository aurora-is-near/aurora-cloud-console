"use server"

import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import type { SiloWhitelistAddress, SiloWhitelistType } from "@/types/types"

export const updateSiloWhitelistAddress = async (
  address: string,
  inputs: { list: SiloWhitelistType } & (
    | Pick<SiloWhitelistAddress, "is_applied">
    | Pick<SiloWhitelistAddress, "remove_tx_id">
  ),
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
