import { NextRequest } from "next/server"
import { createApiEndpoint } from "@/utils/api"
import { proxyApiClient } from "@/utils/proxy-api/request"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"
import { getDealVarKey } from "../../../../../utils/proxy-api/get-deal-var-key"
import { ApiRequestContext } from "@/types/api"

export const GET = createApiEndpoint(
  "getDealEnabled",
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const supabase = createAdminSupabaseClient()

    // TODO: Replace this with a check to see if the deal exists in the Proxy API
    // for the given team and deal IDs, 404 otherwise.
    const result = await supabase
      .from("deals")
      .select("*")
      .eq("id", Number(ctx.params.id))
      .eq("team_id", ctx.team.id)
      .single()

    assertValidSupabaseResult(result)
    assertNonNullSupabaseResult(result)

    // TODO: Use this instead of the ACC column (which should be deleted
    // when the proxy API is ready)
    await proxyApiClient.view([
      {
        var_type: "number",
        key: getDealVarKey(ctx.team.id, Number(ctx.params.id), "enabled"),
      },
    ])

    return {
      enabled: result.data.enabled,
    }
  },
)

export const PUT = createApiEndpoint(
  "updateDealEnabled",
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const supabase = createAdminSupabaseClient()
    const { enabled } = await req.json()

    const result = await supabase
      .from("deals")
      .update({ enabled })
      .eq("id", Number(ctx.params.id))
      .eq("team_id", ctx.team.id)
      .select("*")
      .single()

    assertValidSupabaseResult(result)
    assertNonNullSupabaseResult(result)

    // TODO: Use this instead of the ACC column (which should be deleted
    // when the proxy API is ready)
    await proxyApiClient.update([
      {
        op_type: "set_value",
        var_type: "number",
        var_key: getDealVarKey(ctx.team.id, Number(ctx.params.id), "enabled"),
        number_value: enabled ? 1 : 0,
      },
    ])

    return result.data
  },
)
