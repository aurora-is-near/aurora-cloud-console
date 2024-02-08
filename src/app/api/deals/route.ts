import { NextRequest } from "next/server"
import { createApiEndpoint } from "@/utils/api"
import { ApiRequestContext } from "@/types/api"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"
import { adaptDeal } from "@/utils/adapters"
import { getDeal } from "@/utils/proxy-api/get-deal"

export const GET = createApiEndpoint(
  "getDeals",
  async (_req: NextRequest, ctx: ApiRequestContext) => {
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
          adaptDeal(
            deal,
            await getDeal(ctx.team.id, deal.id),
            listsResult.data,
          ),
        ),
      ),
    }
  },
)
