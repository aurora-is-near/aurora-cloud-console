import { ApiUser, Deal } from "@/types/types"
import { getDeals } from "@/utils/proxy-api/get-deals"

export const getDealById = async (
  user: ApiUser,
  dealId: number,
): Promise<Deal | null> => {
  const deals = await getDeals(user)

  return deals.find((deal) => deal.id === dealId) ?? null
}
