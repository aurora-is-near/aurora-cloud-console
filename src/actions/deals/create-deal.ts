"use server"

import { applyDealToSilo } from "@/actions/silos/apply-deal-to-silo"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Deal } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const createDeal = async ({
  deal,
  siloId,
}: {
  deal: Pick<Deal, "name" | "team_id">
  siloId: number
}): Promise<Deal> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("deals")
    .insert({
      name: deal.name,
      team_id: deal.team_id,
    })
    .select("*, teams!inner(id)")
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  await applyDealToSilo(result.data.id, siloId)

  return result.data
}
