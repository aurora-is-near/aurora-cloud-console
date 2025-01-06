"use server"

import { RuleUser } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const getRuleUsers = async ({
  userlist_id,
}: {
  userlist_id: number | number[]
}): Promise<RuleUser[]> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("rule_users")
    .select("*")
    .eq("userlist_id", userlist_id)

  assertValidSupabaseResult(result)

  return result.data as RuleUser[]
}
