"use server"

import { RuleUser } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"
import { PostgrestResponseSuccess } from "@/types/postgrest"

export const getRuleUsers = async ({
  userlist_id,
}: {
  userlist_id: number | number[]
}): Promise<PostgrestResponseSuccess<RuleUser[]>> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("rule_users")
    .select("*, rule_users_userlists!inner(*, userlists!inner(*))")
    .eq("rule_users_userlists.userlist_id", userlist_id)
    .is("deleted_at", null)

  assertValidSupabaseResult(result)

  return result
}
