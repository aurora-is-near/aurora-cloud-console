import { createApiEndpoint } from "@/utils/api"
import { adaptDeal } from "@/utils/adapters"
import { createDeal } from "@/actions/deals/create-deal"
import { getTeamDeals } from "@/actions/team-deals/get-team-deals"
import { abortIfNotFound } from "@/utils/supabase"

export const GET = createApiEndpoint("getDeals", async (_req, ctx) => {
  const deals = await getTeamDeals(Number(ctx.team.id))

  return {
    items: deals.map(adaptDeal),
  }
})

export const POST = createApiEndpoint("createDeal", async (_req, ctx) => {
  const { name } = ctx.body
  const deal = await createDeal({ deal: { name, team_id: ctx.team.id } })

  abortIfNotFound(deal)

  return adaptDeal(deal)
})
