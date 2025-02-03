"use server"

import { Rule } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"
import { PostgrestResponseSuccess } from "@/types/postgrest"

export const getRules = async ({
  dealId,
}: {
  dealId: number
}): Promise<PostgrestResponseSuccess<Rule[]>> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("rules")
    .select("*")
    .eq("deal_id", dealId)
    .is("deleted_at", null)

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result
}
