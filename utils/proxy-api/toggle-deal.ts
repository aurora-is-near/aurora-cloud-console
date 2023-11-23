import { ApiUser, Deal } from "@/types/types"
import { getDealById } from "@/utils/proxy-api/get-deal-by-id"
import { adminSupabase } from "@/utils/supabase"

export const toggleDeal = async (
  user: ApiUser,
  dealId: number,
  enabled: boolean,
): Promise<Deal | null> => {
  const deal = await getDealById(user, dealId)

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
