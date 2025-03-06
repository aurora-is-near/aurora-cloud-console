"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const applyDealToSilo = async (dealId: number, siloId: number) => {
  const supabase = createAdminSupabaseClient()

  const { data: silo } = await supabase
    .from("silos")
    .select("applied_deal_ids")
    .eq("id", siloId)
    .single()

  if (!silo) {
    throw new Error("Silo not found")
  }

  const newAppliedDealIds = new Set([...silo.applied_deal_ids, dealId])

  const result = await supabase
    .from("silos")
    .update({
      applied_deal_ids: Array.from(newAppliedDealIds),
    })
    .eq("id", siloId)

  return result.data
}
