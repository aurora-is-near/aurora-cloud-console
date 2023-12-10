import { Database } from "@/types/supabase"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies, headers } from "next/headers"
import { adminSupabase } from "./supabase"
import { ApiUser } from "@/types/types"
import { getUserTeamKeys } from "@/utils/team"

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
  const { data } = await adminSupabase()
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

  const supabase = adminSupabase()
  const { error, data } = await supabase
    .from("api_keys")
    .select("id, user_id, scopes")
    .eq("key", apiKey)
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

  // Set the last used timestamp for the API key asynchronously.
  void supabase
    .from("api_keys")
    .update({ last_used_at: new Date().toISOString() })
    .eq("key", apiKey)

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
  const supabase = createRouteHandlerClient<Database>({ cookies })

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

  // If authenticated using a valid session cookie e assume the user is logged
  // in via the dashboard and should be given write permissions.
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
