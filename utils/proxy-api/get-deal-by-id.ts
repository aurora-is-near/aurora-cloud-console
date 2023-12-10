import { Deal } from "@/types/types"
import { getDeals } from "@/utils/proxy-api/get-deals"

export const getDealById = async (
  teamKey: string | null,
  dealId: number,
): Promise<Deal | null> => {
  const deals = await getDeals(teamKey)

  return deals.find((deal) => deal.id === dealId) ?? null
}
