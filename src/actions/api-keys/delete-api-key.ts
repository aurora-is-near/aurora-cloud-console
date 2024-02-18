"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"
import { getCurrentUser } from "@/actions/current-user/get-current-user"

export const deleteApiKey = async (id: number) => {
  const user = await getCurrentUser()
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("api_keys")
    .delete()
    .eq("id", id)
    .eq("user_id", user.user_id)

  assertValidSupabaseResult(result)
}
