import { abort } from "@/utils/abort"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { adminSupabase } from "@/utils/supabase/admin-supabase"
import { getTeam } from "@/utils/team"
import { NextRequest, NextResponse } from "next/server"

export const DELETE = apiRequestHandler(
  ["admin"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const apiKeyId = ctx.params.id

    if (!ctx.teamKey) {
      abort(400, "No team key found")
    }

    const supabase = adminSupabase()
    const team = await getTeam(ctx.teamKey)
    const { error } = await supabase
      .from("users_teams")
      .delete()
      .filter("user_id", "eq", apiKeyId)
      .eq("user_id", apiKeyId)
      .eq("team_id", team.id)

    if (error) {
      throw error
    }

    return NextResponse.json({ status: "OK" })
  },
)
