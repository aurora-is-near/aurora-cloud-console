import { Deal, Team } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getDeals = async (team: Team): Promise<Deal[]> => {
  const { data: deals, error: dealsError } = await createAdminSupabaseClient()
    .from("deals")
    .select("*")
    .order("created_at", { ascending: true })
    .eq("team_id", team.id)

  if (!deals) {
    return []
  }

  if (dealsError) {
    throw dealsError
  }

  const dealIds = deals?.map((deal) => deal.id)

  const { data: contracts, error: contractsError } =
    await createAdminSupabaseClient()
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
    demo_key: deal.demo_key,
    enabled: deal.enabled,
    contracts: contracts.filter((contract) => contract.deal_id === deal.id),
    team_id: deal.team_id,
  }))
}
