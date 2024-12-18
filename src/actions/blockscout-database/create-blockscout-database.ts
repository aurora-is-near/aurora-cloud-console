"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { BlockscoutDatabase } from "@/types/types"
import { encryptBlockscoutPassword } from "@/utils/blockscout"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const createBlockscoutDatabase = async ({
  password,
  ...restInputs
}: Omit<
  BlockscoutDatabase,
  "id" | "created_at" | "updated_at"
>): Promise<BlockscoutDatabase> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("blockscout_databases")
    .insert({
      ...restInputs,
      password: encryptBlockscoutPassword(password),
    })
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
