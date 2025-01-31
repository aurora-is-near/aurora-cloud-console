import { createApiEndpoint } from "@/utils/api"
import { adaptDeal } from "@/utils/adapters"
import { updateDeal } from "@/actions/deals/update-deal"
import { abortIfNotFound } from "@/utils/supabase"
import { getTeamDeal } from "@/actions/team-deals/get-team-deal"
import { abort } from "../../../../utils/abort"

export const GET = createApiEndpoint("getDeal", async (_req, ctx) => {
  const result = await getTeamDeal(ctx.team.id, Number(ctx.params.id))

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

  abortIfNotFound(updatedDeal)

  return adaptDeal(updatedDeal)
})
