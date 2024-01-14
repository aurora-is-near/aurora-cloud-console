import { Deal } from "@/types/types"
import { getDealById } from "@/utils/proxy-api/get-deal-by-id"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const toggleDeal = async (
  teamKey: string | null,
  dealId: number,
  enabled: boolean,
): Promise<Deal | null> => {
  const deal = await getDealById(teamKey, dealId)

  if (!deal) {
    return null
  }

  const result = await createAdminSupabaseClient()
    .from("deals")
    .update({ enabled })
    .eq("id", dealId)

  assertValidSupabaseResult(result)

  return {
    ...deal,
    enabled,
  }
}
