import { createApiEndpoint } from "@/utils/api"
import { adaptDeal } from "@/utils/adapters"
import { createDeal } from "@/actions/deals/create-deal"
import { getDeals } from "@/actions/deals/get-deals"

export const GET = createApiEndpoint("getDeals", async (_req, ctx) => {
  const deals = await getDeals({ teamId: ctx.team.id })

  return {
    items: deals.map(adaptDeal),
  }
})

export const POST = createApiEndpoint("createDeal", async (_req, ctx) => {
  const { name } = ctx.body
  const deal = await createDeal({ name, team_id: ctx.team.id })

  return adaptDeal(deal)
})
