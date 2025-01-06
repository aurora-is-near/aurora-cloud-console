"use server"

import { RuleUserlist } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const getRuleUserlists = async ({
  rule_id,
}: {
  rule_id: number
}): Promise<RuleUserlist[]> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("rule_userlists")
    .select("*")
    .eq("rule_id", rule_id)

  assertValidSupabaseResult(result)

  return result.data as RuleUserlist[]
}
