import { createApiEndpoint } from "@/utils/api"
import { adaptRule } from "@/utils/adapters"
import { getRules } from "@/actions/rules/get-rules"
import { createRule } from "@/actions/rules/create-rule"
import {
  abortIfNoSupabaseResult,
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"
import { createRuleUserlist } from "@/actions/rule-userlists/create-rule-userlist"

export const GET = createApiEndpoint("getRules", async (_req, ctx) => {
  const result = await getRules({ dealId: Number(ctx.params.id) })

  abortIfNoSupabaseResult(404, result)

  return {
    items: result.data.map(adaptRule),
  }
})

export const POST = createApiEndpoint("createRule", async (req, ctx) => {
  const { resourceDefinition } = ctx.body
  const result = await createRule({
    rule: {
      deal_id: Number(ctx.params.id),
      resource_definition: resourceDefinition,
    },
    team_id: Number(ctx.params.teamId),
  })

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)
  abortIfNoSupabaseResult(404, result)

  // Every Rule needs a Userlist in ACC's UI
  await createRuleUserlist({
    team_id: Number(ctx.params.teamId),
    rule_id: result.data.id,
  })

  return adaptRule(result.data)
})
