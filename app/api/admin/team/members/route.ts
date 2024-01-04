import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { TeamMembers } from "@/types/types"
import { abort } from "@/utils/abort"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const GET = apiRequestHandler(
  ["admin"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    if (!ctx.teamKey) {
      abort(500, "No team key found")
    }

    const supabase = createAdminSupabaseClient()
    const { data: team, error: teamError } = await supabase
      .from("teams")
      .select("id, name, team_key")
      .eq("team_key", ctx.teamKey)
      .single()

    if (teamError) {
      throw teamError
    }

    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("id, name, email, users_teams!inner(user_id, confirmed_at)")
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
        isPending: !user.users_teams[0].confirmed_at,
      })),
    })
  },
)
