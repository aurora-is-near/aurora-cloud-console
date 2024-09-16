"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { User } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"
import { createTeam } from "@/actions/teams/create-team"

export const createUser = async (inputs: {
  email: string
  name: string
  company: string
  marketing_consent: boolean
  redirect_url: string
}): Promise<User> => {
  const supabase = createAdminSupabaseClient()

  // Check if user already exists
  const { data: existingUser, error: existingUserError } = await supabase
    .from("users")
    .select()
    .eq("email", inputs.email)
    .single()

  if (existingUserError && existingUserError.code !== "PGRST116") {
    throw new Error(existingUserError.message)
  }

  if (existingUser) {
    // If user already exists, sign in instead
    const { error: signInError } = await supabase.auth.signInWithOtp({
      email: inputs.email,
      options: {
        emailRedirectTo: inputs.redirect_url,
      },
    })

    if (signInError) {
      throw new Error(`Failed to send sign-in link: ${signInError.message}`)
    }

    return existingUser
  }

  let teamKey = inputs.company
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

  // Check if team already exists with the teamKey
  const { data: existingTeam, error: existingTeamError } = await supabase
    .from("teams")
    .select()
    .eq("team_key", teamKey)
    .single()

  if (
    existingTeam ??
    (existingTeamError && existingTeamError.code !== "PGRST116")
  ) {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000)

    teamKey = `${teamKey}-${randomSuffix}`
  }

  const team = await createTeam({
    name: inputs.company,
    website: "",
    team_key: teamKey,
    email: inputs.email,
    transaction_database: "AURORA_DEMO",
    updated_at: new Date().toISOString(),
  })

  // Create in auth.users
  const { error: authError } = await supabase.auth.admin.createUser({
    email: inputs.email,
    email_confirm: true,
    user_metadata: {
      name: inputs.name,
      company: inputs.company,
      marketing_consent: inputs.marketing_consent,
    },
  })

  if (authError) {
    throw authError
  }

  // Fetch the user from public.users (created by supabase function)
  const result = await supabase
    .from("users")
    .select()
    .eq("email", inputs.email)
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  if (!result.data) {
    throw new Error("User was not created successfully")
  }

  // Add user to team
  const { error: teamError } = await supabase.from("users_teams").insert({
    user_id: result.data.id,
    team_id: team.id,
    confirmed_at: new Date().toISOString(),
  })

  if (teamError) {
    throw new Error(`Failed to add user to team: ${teamError.message}`)
  }

  // Update marketing consent
  await supabase
    .from("users")
    .update({ marketing_consent: inputs.marketing_consent })
    .eq("id", result.data.id)

  // Send sign-in link to the user's email
  const { error: signInError } = await supabase.auth.signInWithOtp({
    email: inputs.email,
    options: {
      emailRedirectTo: inputs.redirect_url,
    },
  })

  if (signInError) {
    throw new Error(`Failed to send sign-in link: ${signInError.message}`)
  }

  return result.data
}
