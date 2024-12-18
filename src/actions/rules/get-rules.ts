"use server"

import { Rule } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const getRules = async ({
  dealId,
}: {
  dealId: number
}): Promise<Rule[]> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase.from("rules").select("*").eq("deal_id", dealId)

  assertValidSupabaseResult(result)

  return result.data as Rule[]
}
