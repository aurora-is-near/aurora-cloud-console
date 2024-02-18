"use server"

import { abort } from "@/utils/abort"
import { sendEmail } from "@/utils/email"
import { Team } from "@/types/types"
import { isTeamMember } from "@/utils/team"
import { AUTH_ACCEPT_ROUTE } from "@/constants/routes"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

const getUserId = async (email: string) => {
  const cleanedEmail = email.toLowerCase().trim()
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("users")
    .select("id")
    .ilike("email", `%${cleanedEmail}%`)
    .maybeSingle()

  assertValidSupabaseResult(result)

  return result.data
}

const addUserToTeam = async (
  userId: number,
  email: string,
  team: Team,
  origin: string,
) => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("users_teams")
    .insert([{ team_id: team.id, user_id: userId }])

  assertValidSupabaseResult(result)

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

export const inviteUser = async (
  team: Team,
  {
    email,
    name,
    origin,
  }: {
    email: string
    name: string
    origin: string
  },
) => {
  const cleanedEmail = email.toLowerCase().trim()
  const supabase = createAdminSupabaseClient()
  const user = await getUserId(cleanedEmail)

  if (!user) {
    const { error } = await supabase.auth.admin.inviteUserByEmail(email, {
      redirectTo: `${origin}${AUTH_ACCEPT_ROUTE}`,
      data: { name, new_team: team.team_key },
    })

    if (error) {
      throw error
    }

    return
  }

  if (await isTeamMember(user.id, team.id)) {
    abort(400, "User is already a member of this team")
  }

  await addUserToTeam(user.id, cleanedEmail, team, origin)
}
