"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"
import { getCurrentUser } from "@/actions/current-user/get-current-user"

export const getApiKeys = async () => {
  const supabase = createAdminSupabaseClient()
  const user = await getCurrentUser()
  const result = await supabase
    .from("api_keys")
    .select()
    .order("id", { ascending: true })
    .eq("user_id", user.user_id)

  assertValidSupabaseResult(result)

  return result.data
}
