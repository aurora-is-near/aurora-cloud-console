import { ApiUser, Deal } from "@/types/types"
import { adminSupabase } from "@/utils/supabase"

export const getDeals = async (user: ApiUser): Promise<Deal[]> => {
  if (!user.company_id) {
    return []
  }

  const { data: deals, error: dealsError } = await adminSupabase()
    .from("deals")
    .select("id, name, created_at, key, enabled")
    .order("created_at", { ascending: false })
    .eq("company_id", user.company_id)

  if (!deals) {
    return []
  }

  if (dealsError) {
    throw dealsError
  }

  const dealIds = deals?.map((deal) => deal.id)

  const { data: contracts, error: contractsError } = await adminSupabase()
    .from("contracts")
    .select("*")
    .in("deal_id", dealIds)

  if (contractsError) {
    throw contractsError
  }

  return deals?.map((deal) => ({
    id: deal.id,
    name: deal.name,
    created_at: deal.created_at,
    key: deal.key,
    enabled: deal.enabled,
    contracts: contracts.filter((contract) => contract.deal_id === deal.id),
  }))
}
