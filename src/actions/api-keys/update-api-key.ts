"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"
import { PublicApiScope } from "@/types/types"
import { getCurrentUser } from "@/actions/current-user/get-current-user"

export const updateApiKey = async (
  id: number,
  data: {
    note: string
    scopes: PublicApiScope[]
  },
) => {
  const user = await getCurrentUser()

  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("api_keys")
    .update(data)
    .eq("id", id)
    .eq("user_id", user.user_id)
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
