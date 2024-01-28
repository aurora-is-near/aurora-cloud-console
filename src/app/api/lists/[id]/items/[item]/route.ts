import { getTeamList } from "@/actions/admin/team-lists/get-team-list"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { ApiRequestContext } from "@/types/api"
import { createApiEndpoint } from "@/utils/api"
import { assertValidSupabaseResult } from "@/utils/supabase"
import { NextRequest } from "next/server"

export const DELETE = createApiEndpoint(
  "deleteListItem",
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const supabase = createAdminSupabaseClient()

    const listItemResult = await supabase
      .from("list_items")
      .select("*, lists(id, team_id)")
      .eq("lists.team_id", ctx.team.id)
      .eq("lists.id", Number(ctx.params.id))
      .eq("value", decodeURIComponent(ctx.params.item))
      .single()

    assertValidSupabaseResult(listItemResult)

    const result = await supabase
      .from("list_items")
      .delete()
      .eq("id", listItemResult.data.id)

    assertValidSupabaseResult(result)

    return null
  },
)
