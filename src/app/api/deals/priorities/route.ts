import { NextRequest } from "next/server"
import { createApiEndpoint } from "@/utils/api"
import { abort } from "../../../../utils/abort"
import { proxyApiClient } from "@/utils/proxy-api/request"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"
import { ApiRequestContext } from "@/types/api"
import { ProxyApiUpateOperation } from "@/types/proxy-api"

export const GET = createApiEndpoint(
  "getDealPriorities",
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const supabase = createAdminSupabaseClient()

    const result = await supabase
      .from("deals")
      .select("id, name, priority, team_id")
      .order("priority", { ascending: true })
      .eq("team_id", ctx.team.id)

    assertValidSupabaseResult(result)

    if (!result.data) {
      abort(404)
    }

    // TODO: Use this instead of the ACC column (which should be deleted
    // when the proxy API is ready)
    await proxyApiClient.view([
      {
        // Will return array with all elements of priority list
        elements_of_set: `deal::acc::customers::${ctx.team.id}::dealPrios`,
        keys_only: true,
      },
      {
        // Will return array with all priority -> id pointers and their values
        var_type: "string",
        begin_key: `deal::acc::customers::${ctx.team.id}::dealByPrio::0`,
        end_key: `deal::acc::customers::${ctx.team.id}::dealByPrio::999999`,
      },
    ])

    return {
      items: result.data.map((deal) => ({
        dealId: deal.id,
        name: deal.name,
        priority: deal.priority,
      })),
    }
  },
)

export const PUT = createApiEndpoint(
  "updateDealPriorities",
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const supabase = createAdminSupabaseClient()
    const { priorities } = (await req.json()) as {
      priorities: { dealId: number; priority: string }[]
    }

    const result = await supabase
      .from("deals")
      .select("id, name, team_id")
      .eq("team_id", ctx.team.id)

    priorities.forEach(({ dealId, priority }, _index, arr) => {
      const deal = result.data?.find((deal) => deal.id === dealId)

      if (!deal) {
        abort(400, `No deal found with id ${dealId}`)
      }

      if (!priority) {
        abort(400, `No priority provided for deal ${dealId}`)
      }

      // Priority must match format 0001, 0002, 0003, etc.
      if (!priority.match(/^[0-9]{4}$/)) {
        abort(400, `Invalid priority: ${priority}`)
      }

      // Check if the same priority was used for another deal
      const duplicate = arr.find(
        (p) => p.priority === priority && p.dealId !== dealId,
      )

      if (duplicate) {
        abort(400, `Priority ${priority} cannot be used for multiple deals`)
      }
    })

    assertValidSupabaseResult(result)

    if (!result.data) {
      abort(404)
    }

    // TODO: Use this instead of the ACC column (which should be deleted
    // when the proxy API is ready)
    await proxyApiClient.update([
      {
        // Reset execution list
        op_type: "reset",
        var_type: "set",
        var_key: `deal::acc::customers::${ctx.team.id}::dealPrios`,
        value_reset_policy: "recreate",
      },
      ...priorities.reduce<ProxyApiUpateOperation[]>(
        (acc, priority) => [
          ...acc,
          {
            // Create priority -> ID pointer
            op_type: "set",
            var_type: "string",
            var_key: `deal::acc::customers::${ctx.team.id}::dealByPrio::${priority.priority}`,
            template_key: "template::deal::acc::pointer",
          },
          {
            // Set value for priority -> ID pointer
            op_type: "set_value",
            var_type: "string",
            var_key: `deal::acc::customers::${ctx.team.id}::dealByPrio::${priority.priority}`,
            string_var: priority.dealId,
          },
        ],
        [],
      ),
    ])

    // TODO: Remove this once the temporary priority column has gone
    await Promise.all(
      priorities.map((priority) => {
        return supabase
          .from("deals")
          .update({ priority: priority.priority })
          .eq("id", priority.dealId)
      }),
    )

    const dealNames = result.data.reduce<Record<number, string>>(
      (acc, deal) => ({
        ...acc,
        [deal.id]: deal.name,
      }),
      {},
    )

    return {
      items: priorities.map((priority) => ({
        dealId: priority.dealId,
        name: dealNames[priority.dealId],
        priority: priority.priority,
      })),
    }
  },
)
