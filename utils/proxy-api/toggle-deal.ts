import { Deal } from "@/types/types"
import { getDealById } from "@/utils/proxy-api/get-deal-by-id"
import { adminSupabase } from "@/utils/supabase/admin-supabase"

export const toggleDeal = async (
  teamKey: string | null,
  dealId: number,
  enabled: boolean,
): Promise<Deal | null> => {
  const deal = await getDealById(teamKey, dealId)

  if (!deal) {
    return null
  }

  const { error } = await adminSupabase()
    .from("deals")
    .update({ enabled })
    .eq("id", dealId)

  if (error) {
    throw error
  }

  return {
    ...deal,
    enabled,
  }
}
