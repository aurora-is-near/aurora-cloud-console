import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { adminSupabase } from "@/utils/supabase"
import { Team } from "@/types/types"
import { getTeamKey } from "@/utils/team-key"
import { abort } from "@/utils/abort"

export const GET = apiRequestHandler(
  ["admin"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const teamKey = getTeamKey(req)

    if (!teamKey) {
      abort(404)
    }

    const supabase = adminSupabase()
    const { data: team, error } = await supabase
      .from("teams")
      .select("id, name, team_key")
      .eq("team_key", teamKey)
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json<Team>(team)
  },
)
