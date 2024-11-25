import { createApiEndpoint } from "@/utils/api"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"
import { adaptDeal } from "@/utils/adapters"
import { createDeal } from "@/actions/deals/create-deal"

export const GET = createApiEndpoint("getDeals", async (_req, ctx) => {
  const supabase = createAdminSupabaseClient()
  const dealsResult = await supabase
    .from("deals")
    .select("*")
    .order("id", { ascending: true })
    .eq("team_id", ctx.team.id)

  assertValidSupabaseResult(dealsResult)

  return {
    items: await Promise.all(
      dealsResult.data.map(async (deal) => adaptDeal(deal)),
    ),
  }
})

export const POST = createApiEndpoint("createDeal", async (_req, ctx) => {
  const { name } = ctx.body
  const deal = await createDeal({ name, team_id: ctx.team.id })

  return {
    id: deal.id,
    name: deal.name,
    enabled: deal.enabled ?? false,
    open: deal.open ?? false,
    createdAt: deal.created_at,
    updatedAt: deal.updated_at,
    deletedAt: deal.deleted_at,
    teamId: deal.team_id,
    siloId: deal.silo_id,
    startTime: deal.start_time,
    endTime: deal.end_time,
  }
})
