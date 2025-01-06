"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { RuleUserlist } from "@/types/types"
import {
  abortIfNoSupabaseResult,
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const createRuleUserlist = async (inputs: {
  rule_id: number
}): Promise<RuleUserlist> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("rule_userlists")
    .insert(inputs)
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)
  abortIfNoSupabaseResult(404, result)

  return result.data as RuleUserlist
}
