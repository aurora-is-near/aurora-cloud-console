import { createApiEndpoint } from "@/utils/api"
import { adaptDeal } from "@/utils/adapters"
import { updateDeal } from "@/actions/deals/update-deal"
import { getDeal } from "@/actions/deals/get-deal"
import { abortIfNoSupabaseResult } from "@/utils/supabase"
import { abort } from "../../../../utils/abort"

export const GET = createApiEndpoint("getDeal", async (_req, ctx) => {
  const result = await getDeal(Number(ctx.params.id))

  if (!result) {
    abort(404)
  }

  return adaptDeal(result)
})

export const PUT = createApiEndpoint("updateDeal", async (req, ctx) => {
  const { startTime, endTime, ...rest } = ctx.body
  const updatedDeal = await updateDeal(Number(ctx.params.id), {
    ...rest,
    start_time: startTime,
    end_time: endTime,
  })

  abortIfNoSupabaseResult(404, updatedDeal)

  return adaptDeal(updatedDeal.data)
})
