import { NextRequest, NextResponse } from "next/server"
import { adminSupabase } from "@/utils/supabase"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { abort } from "@/utils/abort"
import { getTeamKey } from "@/utils/team-key"
import { sendEmail } from "@/utils/email"
import { Team } from "@/types/types"
import { getTeam, isTeamMember } from "@/utils/team"

const getUserId = async (email: string) => {
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

const addUserToTeam = async (
  userId: number,
  email: string,
  team: Team,
  origin: string,
) => {
  const supabase = adminSupabase()
  const { error } = await supabase
    .from("users_teams")
    .insert([{ team_id: team.id, user_id: userId }])

  if (error) {
    throw error
  }

  await sendEmail({
    From: "console@auroracloud.dev",
    To: email,
    Subject: `You've been invited to a team on Aurora Cloud Console`,
    HtmlBody: `
      <p>Hi there,</p>
      <p>You've been invited to join the <strong>${team.name}</strong> team on Aurora Cloud Console.</p>
      <p>
        <a href="${origin}">
          Click here to get started
        </a>
      </p>
    `,
  })
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

export const POST = apiRequestHandler(["admin"], async (req: NextRequest) => {
  const { email, name } = await req.json()
  const cleanedEmail = email.toLowerCase().trim()
  const supabase = adminSupabase()
  const teamKey = getTeamKey(req)

  if (!teamKey) {
    abort(500, "No team key found")
  }

  const user = await getUserId(cleanedEmail)

  if (!user) {
    const { error } = await supabase.auth.admin.inviteUserByEmail(email, {
      redirectTo: req.nextUrl.origin,
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

  if (await isTeamMember(user.id, team.id)) {
    abort(400, "User is already a member of this team")
  }

  await addUserToTeam(user.id, cleanedEmail, team, req.nextUrl.origin)

  return NextResponse.json({ status: "OK" })
})
