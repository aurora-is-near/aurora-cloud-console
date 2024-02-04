import { NextRequest } from "next/server"
import { createApiEndpoint } from "@/utils/api"
import { abort } from "../../../../utils/abort"
import { ApiRequestBody, ApiRequestContext } from "@/types/api"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"
import { proxyApiClient } from "@/utils/proxy-api/request"
import { getDealViewOperations } from "@/utils/proxy-api/get-deal-view-operations"
import { getDealUpdateOperations } from "@/utils/proxy-api/get-deal-update-operations"
import { adaptDeal } from "@/utils/adapters"

const parseTimeParam = (time?: string | null) => {
  if (time === null) {
    return null
  }

  if (!time) {
    return undefined
  }

  const parsed = Date.parse(time)

  if (isNaN(parsed)) {
    abort(400, `Invalid request body: startTime must be a date string`)
  }

  return parsed
}

export const GET = createApiEndpoint(
  "getDeal",
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const supabase = createAdminSupabaseClient()
    const result = await supabase
      .from("deals")
      .select("*")
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

    return adaptDeal(result.data)
  },
)

export const PUT = createApiEndpoint(
  "updateDeal",
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const supabase = createAdminSupabaseClient()
    const { enabled, startTime, endTime } =
      (await req.json()) as ApiRequestBody<"updateDeal">

    if (typeof enabled !== undefined && typeof enabled !== "boolean") {
      abort(400, "Invalid request body: enabled must be a boolean")
    }

    const result = await supabase
      .from("deals")
      .update({
        enabled,
        start_time: parseTimeParam(startTime),
        end_time: parseTimeParam(endTime),
      })
      .eq("id", Number(ctx.params.id))
      .eq("team_id", ctx.team.id)
      .select("*")
      .single()

    assertValidSupabaseResult(result)
    assertNonNullSupabaseResult(result)

    // TODO: Use this instead of the ACC database, when the Proxy API is ready
    await proxyApiClient.update(
      getDealUpdateOperations(ctx.team.id, Number(ctx.params.id), {
        enabled,
        startTime: parseTimeParam(startTime),
        endTime: parseTimeParam(endTime),
      }),
    )

    await proxyApiClient.view(
      getDealViewOperations(ctx.team.id, Number(ctx.params.id)),
    )

    return adaptDeal(result.data)
  },
)
