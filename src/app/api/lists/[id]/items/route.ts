import { NextRequest } from "next/server"
import { createApiEndpoint } from "@/utils/api"
import { ApiRequestContext } from "@/types/api"
import { abort } from "../../../../../utils/abort"
import { getTeamList } from "@/actions/admin/team-lists/get-team-list"
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
      getTeamList(ctx.team.id, Number(ctx.params.id)),
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
