"use server"

import { removeDealFromSilo } from "@/actions/silos/remove-deal-from-silo"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

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
