import { Deal } from "@/types/types"
import { getTeam } from "@/utils/team"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getDeals = async (teamKey: string | null): Promise<Deal[]> => {
  if (!teamKey) {
    return []
  }

  const team = await getTeam(teamKey)

  const { data: deals, error: dealsError } = await createAdminSupabaseClient()
    .from("deals")
    .select("*")
    .order("created_at", { ascending: false })
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
    borealis_deal_id: deal.borealis_deal_id,
    team_id: deal.team_id,
  }))
}
