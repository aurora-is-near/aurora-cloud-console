"use server"

import { PublicApiScope } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"
import { getCurrentUser } from "@/actions/current-user/get-current-user"

export const createApiKey = async (data: {
  note: string
  scopes: PublicApiScope[]
}) => {
  const supabase = createAdminSupabaseClient()
  const user = await getCurrentUser()
  const result = await supabase
    .from("api_keys")
    .insert({
      ...data,
      user_id: user.user_id,
    })
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
