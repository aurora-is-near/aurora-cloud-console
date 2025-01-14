import { createApiEndpoint } from "@/utils/api"
import { adaptRule } from "@/utils/adapters"
import { getRules } from "@/actions/rules/get-rules"
import { createRule } from "@/actions/rules/create-rule"

export const GET = createApiEndpoint("getRules", async (_req, ctx) => {
  const rules = await getRules({ dealId: Number(ctx.params.id) })

  return {
    items: rules.map(adaptRule),
  }
})

export const POST = createApiEndpoint("createRule", async (req, ctx) => {
  const { resourceDefinition } = ctx.body
  const rule = await createRule({
    deal_id: Number(ctx.params.id),
    team_id: Number(ctx.params.teamId),
    resource_definition: resourceDefinition,
  })

  return adaptRule(rule)
})
