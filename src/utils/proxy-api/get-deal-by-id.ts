import { Deal, Team } from "@/types/types"
import { getDeals } from "@/utils/proxy-api/get-deals"

export const getDealById = async (
  team: Team,
  dealId: number,
): Promise<Deal | null> => {
  const deals = await getDeals(team)

  return deals.find((deal) => deal.id === dealId) ?? null
}
