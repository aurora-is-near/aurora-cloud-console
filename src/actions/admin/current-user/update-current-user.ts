"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const updateCurrentUser = async (
  userGuid: string,
  inputs: { name: string },
) => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("users")
    .update(inputs)
    .eq("user_id", userGuid)
    .select()
    .single()

  assertValidSupabaseResult(result)

  return result.data
}
