import { NextRequest } from "next/server"
import { createApiEndpoint } from "@/utils/api"
import { ApiRequestContext } from "@/types/api"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"
import { proxyApiClient } from "@/utils/proxy-api/client"
import { getDealViewOperations } from "@/utils/proxy-api/get-deal-view-operations"
import { adaptDeal } from "@/utils/adapters"

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

    // TODO: Use this instead of the ACC database, when the Proxy API is ready
    await proxyApiClient.view(
      dealsResult.data
        .map((deal) => getDealViewOperations(ctx.team.id, deal.id))
        .flat(),
    )

    return {
      items: dealsResult.data.map((deal) => adaptDeal(deal, listsResult.data)),
    }
  },
)
