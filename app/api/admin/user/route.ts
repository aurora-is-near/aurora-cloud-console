import { NextRequest, NextResponse } from "next/server"
import { adminSupabase } from "@/utils/supabase"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { abort } from "@/utils/abort"
import { getTeamKey } from "@/utils/team-key"

const isExistingTeamMember = async (userId: number, teamId: number) => {
  const supabase = adminSupabase()
  const { data, error } = await supabase
    .from("users_teams")
    .select("user_id")
    .eq("user_id", userId)
    .eq("team_id", teamId)
    .maybeSingle()

  if (error) {
    throw error
  }

  return !!data
}

const getTeam = async (teamKey: string) => {
  const supabase = adminSupabase()
  const { data, error } = await supabase
    .from("teams")
    .select("id, name, team_key")
    .eq("team_key", teamKey)
    .single()

  if (error) {
    throw error
  }

  return data
}

const getUser = async (email: string) => {
  const cleanedEmail = email.toLowerCase().trim()
  const supabase = adminSupabase()
  const { data, error } = await supabase
    .from("users")
    .select("id")
    .ilike("email", `%${cleanedEmail}%`)
    .maybeSingle()

  if (error) {
    throw error
  }

  return data
}

export const PATCH = apiRequestHandler(
  ["admin"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const { name } = await req.json()
    const supabase = adminSupabase()
    const { error } = await supabase
      .from("users")
      .update({ name })
      .eq("user_id", ctx.user.user_id)

    if (error) throw error

    return NextResponse.json({ status: "OK" })
  },
)

export const POST = apiRequestHandler(
  ["admin"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const { email, name } = await req.json()
    const cleanedEmail = email.toLowerCase().trim()
    const supabase = adminSupabase()
    const teamKey = getTeamKey(req)

    if (!teamKey) {
      abort(500, "No team key found")
    }

    const user = await getUser(cleanedEmail)

    if (!user) {
      const { error } = await supabase.auth.admin.inviteUserByEmail(email, {
        // TODO: Change URL
        redirectTo: "https://aurora-cloud-console.vercel.app",
        data: { name, new_team: teamKey },
      })

      if (error) {
        throw error
      }

      return NextResponse.json({ status: "OK" })
    }

    const team = await getTeam(teamKey)

    if (!team) {
      abort(404, `Team not found for key: ${teamKey}`)
    }

    if (await isExistingTeamMember(user.id, team.id)) {
      abort(400, "User is already a member of this team")
    }

    // Add the user to the team if they exist.
    const { error } = await supabase
      .from("users_teams")
      .insert([{ team_id: team.id, user_id: user.id }])

    return NextResponse.json({ status: "OK" })
  },
)
