import { Database } from "@/types/supabase"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies, headers } from "next/headers"
import { adminSupabase } from "./supabase"
import { User } from "@/types/types"

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

/**
 * Get the public user object associated with the given API key.
 *
 * This is used for requests made to the ACC API directly.
 */
const getUserFromApiKey = async (): Promise<User | null> => {
  const apiKey = getApiKey()

  if (!apiKey) {
    return null
  }

  const supabase = adminSupabase()
  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('api_key', apiKey)
    .single()

  if (error) {
    console.warn(`Error fetching user GUID from API key: ${error.message}`)

    return null
  }

  if (!data) {
    return null
  }

  return data
}

/**
 * Get the public user object associated with the current session cookie.
 *
 * This is used for requests coming from the ACC frontend.
 */
const getUserFromSessionCookie = async (): Promise<User | null> => {
  const supabase = createRouteHandlerClient<Database>({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.id) {
    return null
  }

  const { data: publicUser } = await adminSupabase()
    .from('users')
    .select()
    .eq('user_guid', user.id)
    .single()

  return publicUser
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
