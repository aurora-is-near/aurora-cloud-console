"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"
import { PublicApiScope } from "@/types/types"

export const updateApiKey = async (
  id: number,
  data: {
    note: string
    scopes: PublicApiScope[]
  },
) => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("api_keys")
    .update(data)
    .eq("id", id)
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
