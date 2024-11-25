import { createApiEndpoint } from "@/utils/api"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { abortIfNoSupabaseResult } from "@/utils/supabase"
import { adaptDeal } from "@/utils/adapters"
import { updateDeal } from "@/actions/deals/update-deal"
import { abort } from "../../../../utils/abort"

const parseTimeParam = (time?: string | null) => {
  if (!time || time === null) {
    return null
  }

  const parsed = Date.parse(time)

  if (Number.isNaN(parsed)) {
    abort(400, `Invalid request body: time must be a date string`)
  }

  return new Date(parsed).toISOString()
}

export const GET = createApiEndpoint("getDeal", async (_req, ctx) => {
  const supabase = createAdminSupabaseClient()
  const dealResult = await supabase
    .from("deals")
    .select("*")
    .eq("id", Number(ctx.params.id))
    .eq("team_id", ctx.team.id)
    .maybeSingle()

  abortIfNoSupabaseResult(404, dealResult)

  if (!dealResult.data) {
    abort(404)
  }

  return adaptDeal(dealResult.data)
})

export const PUT = createApiEndpoint("updateDeal", async (req, ctx) => {
  const supabase = createAdminSupabaseClient()
  const dealResult = await supabase
    .from("deals")
    .select("*")
    .eq("id", Number(ctx.params.id))
    .eq("team_id", ctx.team.id)
    .maybeSingle()

  abortIfNoSupabaseResult(404, dealResult)

  if (!dealResult.data) {
    abort(404)
  }

  const { name, open, enabled, startTime, endTime } = ctx.body

  const updatedDeal = await updateDeal(Number(ctx.params.id), {
    name,
    open: open ?? false,
    enabled: enabled ?? false,
    start_time: parseTimeParam(startTime),
    end_time: parseTimeParam(endTime),
  })

  return adaptDeal(updatedDeal)
})
