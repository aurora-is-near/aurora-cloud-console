"use server"

import { assertValidSupabaseResult } from "@/utils/supabase"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import type { SiloWhitelistAddress } from "@/types/types"

export const deleteSiloWhitelistAddress = async (
  inputs: Pick<SiloWhitelistAddress, "address" | "list" | "silo_id">,
): Promise<SiloWhitelistAddress | null> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("silo_whitelist_addresses")
    .delete()
    .eq("address", inputs.address)
    .eq("silo_id", inputs.silo_id)
    .eq("list", inputs.list)
    .select("*")
    .single()

  assertValidSupabaseResult(result)

  return result.data
}
