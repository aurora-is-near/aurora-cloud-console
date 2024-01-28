import { NextRequest } from "next/server"
import { createApiEndpoint } from "@/utils/api"
import { ApiRequestContext } from "@/types/api"
import { abort } from "../../../../../utils/abort"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"
import { getLimitAndOffset } from "@/utils/pagination"

export const GET = createApiEndpoint(
  "getListItems",
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const supabase = createAdminSupabaseClient()
    const { limit, offset } = getLimitAndOffset(req)

    // TODO: Take the list items from the Proxy API
    const [list, listItemsResult, listItemsCountResult] = await Promise.all([
      supabase
        .from("lists")
        .select("*")
        .eq("id", Number(ctx.params.id))
        .eq("team_id", ctx.team.id)
        .maybeSingle(),
      supabase
        .from("list_items")
        .select("*")
        .eq("list_id", Number(ctx.params.id))
        .limit(limit)
        .range(offset, offset + limit - 1),
      supabase
        .from("list_items")
        .select("*", { count: "exact", head: true })
        .eq("list_id", Number(ctx.params.id)),
    ])

    assertValidSupabaseResult(listItemsResult)
    assertValidSupabaseResult(listItemsCountResult)

    if (!list) {
      abort(404)
    }

    return {
      total: listItemsCountResult.count ?? 0,
      items: listItemsResult.data.map((item) => item.value),
    }
  },
)

export const POST = createApiEndpoint(
  "createListItems",
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const supabase = createAdminSupabaseClient()
    const { items } = await req.json()

    const result = await supabase.from("list_items").insert(
      items.map((value: string) => ({
        list_id: Number(ctx.params.id),
        value,
      })),
    )

    assertValidSupabaseResult(result)

    return {
      count: result.count ?? 0,
    }
  },
)
