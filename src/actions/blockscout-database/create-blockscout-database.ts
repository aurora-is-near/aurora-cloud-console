"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { BlockscoutDatabase } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const createSiloOracle = async (
  inputs: Omit<BlockscoutDatabase, "id">,
): Promise<BlockscoutDatabase> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("blockscout_databases")
    .insert(inputs)
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
