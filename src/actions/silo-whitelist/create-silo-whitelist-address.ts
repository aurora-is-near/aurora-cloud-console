"use server"

import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import type { SiloWhitelistAddress } from "@/types/types"

export const createSiloWhitelistAddress = async (
  inputs: Pick<
    SiloWhitelistAddress,
    "address" | "list" | "silo_id" | "add_tx_id" | "remove_tx_id"
  >,
): Promise<SiloWhitelistAddress | null> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("silo_whitelist_addresses")
    .insert(inputs)
    .select("*")
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
