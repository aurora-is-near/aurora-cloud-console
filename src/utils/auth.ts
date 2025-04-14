import { headers } from "next/headers"
import { ApiScope, Team, User } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { createRouteHandlerClient } from "@/supabase/create-route-handler-client"
import { toError } from "@/utils/errors"
import { abort } from "@/utils/abort"
import { logger } from "@/logger"

type AuthContext = {
  team: Team
  scopes: ApiScope[]
}

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
 * Get the team and scopes associated with the given API key.
 *
 * This is used for requests made to the ACC API directly.
 */
const getTeamAndScopesFromApiKey = async (): Promise<AuthContext | null> => {
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
    .select("id, team_id, scopes, teams(*)")
    .single()

  if (!data?.teams) {
    logger.warn(`Invalid API key: ${toError(error).message}`)

    return null
  }

  return {
    team: data.teams,
    scopes: data.scopes,
  }
}

/**
 * Get the public user object associated with the current session cookie.
 *
 * This is used for requests coming from the ACC frontend.
 */
const getUser = async (): Promise<User | null> => {
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

  return user
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
const getTeam = async (): Promise<Team | null> => {
  const url = getReferer()
  const teamKey = url?.pathname.split("/")[2]

  if (!teamKey) {
    return null
  }

  const { data: team } = await createAdminSupabaseClient()
    .from("teams")
    .select("*")
    .eq("team_key", teamKey)
    .maybeSingle()

  if (!team) {
    return null
  }

  return team
}

const getTeamAndScopesFromSession = async (): Promise<AuthContext | null> => {
  const [user, team] = await Promise.all([getUser(), getTeam()])

  if (!user || !team) {
    return null
  }

  // If authenticated using a valid session cookie assume the user is logged
  // in via the dashboard and should be given admin permissions.
  const scopes: ApiScope[] = ["admin"]

  return { team, scopes }
}

export const authorise = async (requiredScopes: ApiScope[]): Promise<Team> => {
  const [teamAndScopesFromSession, teamAndScopesFromApiKey] = await Promise.all(
    [getTeamAndScopesFromSession(), getTeamAndScopesFromApiKey()],
  )

  const teamAndScopes = teamAndScopesFromApiKey ?? teamAndScopesFromSession

  if (!teamAndScopes) {
    abort(401)
  }

  if (
    !!requiredScopes?.length &&
    !requiredScopes.every((scope) => teamAndScopes.scopes.includes(scope)) &&
    !teamAndScopes.scopes.includes("admin")
  ) {
    abort(403)
  }

  return teamAndScopes.team
}

export const authoriseAsAdmin = async () => {
  const apiKey = getApiKey()

  if (!process.env.ADMIN_API_KEY) {
    abort(500, "Admin API key is not set")
  }

  if (!apiKey) {
    abort(401)
  }

  if (apiKey !== process.env.ADMIN_API_KEY) {
    abort(403)
  }
}
