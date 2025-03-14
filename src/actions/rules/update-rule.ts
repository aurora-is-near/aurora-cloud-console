"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Rule } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const updateRule = async (
  id: number,
  deal_id: number,
  inputs: Partial<
    Pick<Rule, "chains" | "contracts" | "except_chains" | "except_contracts">
  >,
): Promise<Rule> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("rules")
    .update({ ...inputs })
    .eq("id", id)
    .eq("deal_id", deal_id)
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
