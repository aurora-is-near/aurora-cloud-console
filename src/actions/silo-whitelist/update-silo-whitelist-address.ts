"use server"

import {
  assertValidSupabaseResult,
  assertNonNullSupabaseResult,
} from "@/utils/supabase"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import type { SiloWhitelistAddress } from "@/types/types"

export const updateSiloWhitelistAddress = async (
  address: string,
  inputs: Pick<SiloWhitelistAddress, "is_applied">,
): Promise<SiloWhitelistAddress | null> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("silo_addresses")
    .update(inputs)
    .eq("address", address)
    .select("*")
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
