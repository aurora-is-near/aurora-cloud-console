import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { adminSupabase } from "@/utils/supabase"
import { Team, TeamMembers, User, Users } from "@/types/types"
import { getTeamKey } from "@/utils/team-key"
import { abort } from "@/utils/abort"

export const GET = apiRequestHandler(
  ["admin"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const teamKey = getTeamKey(req)

    console.log(teamKey)

    if (!teamKey) {
      abort(404)
    }

    const supabase = adminSupabase()
    const { data: team, error: teamError } = await supabase
      .from("teams")
      .select("id, name, team_key")
      .eq("team_key", teamKey)
      .single()

    if (teamError) {
      throw teamError
    }

    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("id, name, email, users_teams!inner(user_id)")
      .eq("users_teams.team_id", team.id)

    if (usersError) {
      throw usersError
    }

    return NextResponse.json<TeamMembers>({
      total: users.length,
      teamMembers: users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
      })),
    })
  },
)
