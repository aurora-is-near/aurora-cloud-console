import { NextRequest } from "next/server"
import { createApiEndpoint } from "@/utils/api"
import { ApiRequestContext } from "@/types/api"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"
import { proxyApiClient } from "@/utils/proxy-api/request"
import { getDealViewOperations } from "@/utils/proxy-api/get-deal-view-operations"

export const GET = createApiEndpoint(
  "getDeals",
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const supabase = createAdminSupabaseClient()
    const result = await supabase
      .from("deals")
      .select("id, created_at, updated_at, name, team_id, enabled")
      .order("created_at", { ascending: true })
      .eq("team_id", ctx.team.id)

    assertValidSupabaseResult(result)

    // TODO: Use this instead of the ACC database, when the Proxy API is ready
    await proxyApiClient.view(
      result.data
        .map((deal) => getDealViewOperations(ctx.team.id, deal.id))
        .flat(),
    )

    return {
      items: result.data,
    }
  },
)
