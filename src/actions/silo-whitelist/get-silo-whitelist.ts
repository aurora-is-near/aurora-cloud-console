"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"
import type { SiloWhitelistAddress, SiloWhitelistType } from "@/types/types"

export const getSiloWhitelist = async (
  siloId: number,
  whitelistKind: SiloWhitelistType,
): Promise<SiloWhitelistAddress[]> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("silo_addresses")
    .select("*")
    .order("id", { ascending: true })
    .eq("silo_id", siloId)
    .eq("list", whitelistKind)

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
