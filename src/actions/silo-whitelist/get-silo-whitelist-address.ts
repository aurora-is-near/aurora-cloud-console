"use server"

import { assertValidSupabaseResult } from "@/utils/supabase"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import type { SiloWhitelistAddress, SiloWhitelistType } from "@/types/types"

export const getSiloWhitelistAddress = async (
  siloId: number,
  whitelistKind: SiloWhitelistType,
  address: string,
): Promise<SiloWhitelistAddress | null> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("silo_addresses")
    .select("*")
    .order("id", { ascending: true })
    .eq("silo_id", siloId)
    .eq("list", whitelistKind)
    .eq("address", address)
    .maybeSingle()

  assertValidSupabaseResult(result)

  return result.data
}
