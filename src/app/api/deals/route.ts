import { createApiEndpoint } from "@/utils/api"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"
import { adaptDeal } from "@/utils/adapters"
import { getDeal } from "@/utils/proxy-api/get-deal"
import { createDeal } from "@/actions/deals/create-deal"

export const GET = createApiEndpoint("getDeals", async (_req, ctx) => {
  const supabase = createAdminSupabaseClient()
  const [dealsResult, listsResult] = await Promise.all([
    supabase
      .from("deals")
      .select("*")
      .order("id", { ascending: true })
      .eq("team_id", ctx.team.id),
    supabase.from("lists").select("*").eq("team_id", ctx.team.id),
  ])

  assertValidSupabaseResult(dealsResult)
  assertValidSupabaseResult(listsResult)

  return {
    items: await Promise.all(
      dealsResult.data.map(async (deal) =>
        adaptDeal(deal, await getDeal(ctx.team.id, deal.id), listsResult.data),
      ),
    ),
  }
})

export const POST = createApiEndpoint("createDeal", async (_req, ctx) => {
  const { name } = ctx.body
  const deal = await createDeal({ name, team_id: ctx.team.id })

  return {
    id: deal.id,
    createdAt: deal.created_at,
    updatedAt: deal.created_at,
    name: deal.name,
    teamId: deal.team_id,
    enabled: false,
    startTime: null,
    endTime: null,
    lists: {},
  }
})
