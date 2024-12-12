"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { BlockscoutDatabase } from "@/types/types"
import { encryptBlockscoutPassword } from "@/utils/blockscout"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const updateBlockscoutDatabase = async (
  id: number,
  {
    password,
    ...restInputs
  }: Omit<BlockscoutDatabase, "id" | "created_at" | "updated_at">,
): Promise<BlockscoutDatabase> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("blockscout_databases")
    .update({
      password: password ? encryptBlockscoutPassword(password) : undefined,
      ...restInputs,
    })
    .eq("id", id)
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
