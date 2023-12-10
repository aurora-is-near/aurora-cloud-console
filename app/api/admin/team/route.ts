import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { adminSupabase } from "@/utils/supabase"
import { Team } from "@/types/types"
import { abort } from "@/utils/abort"

export const GET = apiRequestHandler(
  ["admin"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    if (!ctx.teamKey) {
      abort(500, "No team key found")
    }

    const supabase = adminSupabase()
    const { data: team, error } = await supabase
      .from("teams")
      .select("id, name, website, email, team_key")
      .eq("team_key", ctx.teamKey)
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json<Team>(team)
  },
)
