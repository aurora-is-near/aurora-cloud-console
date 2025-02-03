"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Rule } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const createRule = async (inputs: {
  rule: Pick<Rule, "deal_id" | "resource_definition">
  team_id: number
}): Promise<Rule> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("rules")
    .insert({ ...inputs.rule, ui_enabled: true })
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
