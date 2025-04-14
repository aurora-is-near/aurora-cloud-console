import { createAdminApiEndpoint } from "@/utils/api"
import { adaptDeal } from "@/utils/adapters"
import { getDeals } from "@/actions/deals/get-deals"
import { countDeals } from "@/actions/deals/count-deals"
import { getPaginationFromQuery } from "@/utils/pagination/get-pagination-from-query"

export const GET = createAdminApiEndpoint(async (req) => {
  const [deals, total] = await Promise.all([
    getDeals({
      pagination: getPaginationFromQuery(req),
    }),
    countDeals(),
  ])

  return {
    total,
    items: deals.map(adaptDeal),
  }
})
