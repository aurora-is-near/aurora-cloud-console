"use server"

import { removeDealFromSilo } from "@/actions/silos/remove-deal-from-silo"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

/**
 * @see https://github.com/aurora-is-near/bb-rules/tree/acc-deal/docs/acc#removing-deal
 */
export const deleteDeal = async (id: number, siloId: number) => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase.from("deals").delete().eq("id", id)

  await supabase
    .from("deals")
    .update({
      deleted_at: new Date().toISOString(),
    })
    .eq("id", id)

  await removeDealFromSilo(id, siloId)

  assertValidSupabaseResult(result)
}
