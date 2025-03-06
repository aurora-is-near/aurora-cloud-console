"use server"

import { removeDealFromSilo } from "@/actions/silos/remove-deal-from-silo"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

/**
 * @see https://github.com/aurora-is-near/bb-rules/tree/acc-deal/docs/acc#removing-deal
 */
export const deleteDeal = async (id: number, siloId: number) => {
  const supabase = createAdminSupabaseClient()

  await supabase
    .from("deals")
    .update({
      deleted_at: new Date().toISOString(),
    })
    .eq("id", id)

  await removeDealFromSilo(id, siloId)
}
