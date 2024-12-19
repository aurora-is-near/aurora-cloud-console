import { createApiEndpoint } from "@/utils/api"
import { adaptRule } from "@/utils/adapters"
import { updateRule } from "@/actions/rules/update-rule"

export const PUT = createApiEndpoint("updateRule", async (req, ctx) => {
  const { resourceDefinition } = ctx.body
  const rule = await updateRule(Number(ctx.params.rule_id), {
    deal_id: Number(ctx.params.id),
    resource_definition: resourceDefinition,
  })

  return adaptRule(rule)
})
