import { headers } from "next/headers"
import { ApiUser, Team } from "@/types/types"
import { getUserTeamKeys } from "@/utils/team"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { createRouteHandlerClient } from "@/supabase/create-route-handler-client"

/**
 * Get the API key from the current request.
 */
const getApiKey = () => {
  const headersList = headers()
  const authorization = headersList.get("authorization")
  const scheme = "Bearer "

  if (!authorization?.startsWith(scheme)) {
    return null
  }

  return authorization.substring(scheme.length, authorization.length)
}

const getUserById = async (userId: string) => {
  const { data } = await createAdminSupabaseClient()
    .from("users")
    .select()
    .eq("user_id", userId)
    .single()

  return data
}

/**
 * Get the public user object associated with the given API key.
 *
 * This is used for requests made to the ACC API directly.
 */
const getUserFromApiKey = async (): Promise<ApiUser | null> => {
  const apiKey = getApiKey()

  if (!apiKey) {
    return null
  }

  const supabase = createAdminSupabaseClient()

  // Select the API key and set the last used timestamp.
  const { error, data } = await supabase
    .from("api_keys")
    .update({ last_used_at: new Date().toISOString() })
    .eq("key", apiKey)
    .select("id, user_id, scopes")
    .single()

  if (!data) {
    console.warn(`Invalid API key: ${error.message}`)

    return null
  }

  if (!data) {
    return null
  }

  const [user, teams] = await Promise.all([
    getUserById(data.user_id),
    getUserTeamKeys(data.id),
  ])

  if (!user) {
    return null
  }

  return {
    ...user,
    scopes: data.scopes,
    teams,
  }
}

/**
 * Get the public user object associated with the current session cookie.
 *
 * This is used for requests coming from the ACC frontend.
 */
const getUserFromSessionCookie = async (): Promise<ApiUser | null> => {
  const supabase = createRouteHandlerClient()
  const headersList = headers()
  const referer = headersList.get("referer")
  const host = headersList.get("host")

  // Do not allow the session cookie to be read when called from the API docs
  // page. This is to replicate the behaviour of the API when called externally
  // (where there will be no session cookie).
  if (referer?.includes(`://${host}`) && referer?.endsWith("/api")) {
    return null
  }

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser()

  if (!authUser?.id) {
    return null
  }

  const user = await getUserById(authUser.id)

  if (!user) {
    return null
  }

  // If authenticated using a valid session cookie assume the user is logged
  // in via the dashboard and should be given admin permissions.
  return {
    ...user,
    scopes: ["admin"],
    teams: authUser.user_metadata?.teams ?? [],
  }
}

/**
 * Get the user associated with the current session cookie or API key.
 */
export const getUser = async () => {
  const [userFromCookie, userFromApiKey] = await Promise.all([
    getUserFromSessionCookie(),
    getUserFromApiKey(),
  ])

  return userFromCookie ?? userFromApiKey
}

const getReferer = () => {
  const headersList = headers()
  const referer = headersList.get("referer")

  if (!referer) {
    return null
  }

  return new URL(referer)
}

/**
 * Get the team associated with the current request.
 */
export const getTeam = async (): Promise<Team> => {
  const url = getReferer()
  const teamKey = url?.pathname.split("/")[2]

  if (!teamKey) {
    throw new Error("No team key could be established for the current request.")
  }

  const { data: team } = await createAdminSupabaseClient()
    .from("teams")
    .select("*")
    .eq("team_key", teamKey)
    .maybeSingle()

  if (!team) {
    throw new Error(`No team found with key: ${teamKey}`)
  }

  return team
}
