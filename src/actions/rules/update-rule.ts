"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Rule } from "@/types/types"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const updateRule = async (
  id: number,
  deal_id: number,
  inputs: Pick<Rule, "resource_definition">,
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

  return result.data
}
