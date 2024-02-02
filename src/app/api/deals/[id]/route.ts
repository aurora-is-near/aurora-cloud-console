import { NextRequest } from "next/server"
import { createApiEndpoint } from "@/utils/api"
import { abort } from "../../../../utils/abort"
import { ApiRequestContext } from "@/types/api"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"
import { proxyApiClient } from "@/utils/proxy-api/request"
import { getDealViewOperations } from "@/utils/proxy-api/get-deal-view-operations"
import { getDealUpdateOperations } from "@/utils/proxy-api/get-deal-update-operations"

export const GET = createApiEndpoint(
  "getDeal",
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const supabase = createAdminSupabaseClient()
    const result = await supabase
      .from("deals")
      .select("id, created_at, updated_at, name, team_id, enabled")
      .eq("id", Number(ctx.params.id))
      .eq("team_id", ctx.team.id)
      .maybeSingle()

    assertValidSupabaseResult(result)

    if (!result.data) {
      abort(404)
    }

    // TODO: Use this instead of the ACC database, when the Proxy API is ready
    await proxyApiClient.view(
      getDealViewOperations(ctx.team.id, Number(ctx.params.id)),
    )

    return result.data
  },
)

export const PUT = createApiEndpoint(
  "updateDeal",
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const supabase = createAdminSupabaseClient()
    const { enabled } = await req.json()
    const data = { enabled }

    const result = await supabase
      .from("deals")
      .update(data)
      .eq("id", Number(ctx.params.id))
      .eq("team_id", ctx.team.id)
      .select("*")
      .single()

    assertValidSupabaseResult(result)
    assertNonNullSupabaseResult(result)

    // TODO: Use this instead of the ACC database, when the Proxy API is ready
    await proxyApiClient.update(
      getDealUpdateOperations(ctx.team.id, Number(ctx.params.id), data),
    )

    await proxyApiClient.view(
      getDealViewOperations(ctx.team.id, Number(ctx.params.id)),
    )

    return result.data
  },
)
