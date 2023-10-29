import { Database } from "@/types/supabase"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies, headers } from "next/headers"
import { adminSupabase } from "./supabase"
import { ApiUser } from "@/types/types"

/**
 * Get the API key from the current request.
 */
const getApiKey = () => {
  const headersList = headers()
  const authorization = headersList.get("authorization")
  const scheme = 'Bearer '

  if (!authorization?.startsWith(scheme)) {
    return null
  }

  return authorization.substring(scheme.length, authorization.length)
}

const getUserById = async (userId: string) => {
  const { data } = await adminSupabase()
    .from('users')
    .select()
    .eq('user_id', userId)
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
    .from('api_keys')
    .select(`
      user_id,
      scopes (scope)
    `)
    .eq('key', apiKey)
    .single()

  if (!data) {
    console.warn(`Invalid API key: ${error.message}`)

    return null
  }

  if (!data) {
    return null
  }

  const user = await getUserById(data.user_id)

  if (!user) {
    return null
  }

  return {
    ...user,
    scopes: data.scopes,
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
    scopes: ['admin'],
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
