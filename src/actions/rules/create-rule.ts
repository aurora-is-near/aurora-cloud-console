"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Rule } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const createRule = async (inputs: {
  rule: Pick<
    Rule,
    "deal_id" | "chains" | "except_chains" | "contracts" | "except_contracts"
  >
  team_id: number
}): Promise<Rule> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("rules")
    .insert({
      ...inputs.rule,
      ui_enabled: true,
    })
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
