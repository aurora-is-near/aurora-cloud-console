import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies, headers } from "next/headers"
import { ApiUser } from "@/types/types"
import { prisma } from "./prisma"

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

const getUserById = async (userId: string) =>
  prisma.user.findFirst({
    where: {
      userId,
    },
  })

/**
 * Get the public user object associated with the given API key.
 *
 * This is used for requests made to the ACC API directly.
 */
const getUserFromApiKey = async (): Promise<ApiUser | null> => {
  const key = getApiKey()

  if (!key) {
    return null
  }

  const apiKey = await prisma.apiKey.findFirst({
    where: {
      key,
    },
  })

  if (!apiKey) {
    console.warn("Invalid API key")

    return null
  }

  const user = await getUserById(apiKey.userId)

  if (!user) {
    return null
  }

  // Set the last used timestamp for the API key asynchronously.
  void prisma.apiKey.update({
    where: {
      id: apiKey.id,
    },
    data: {
      lastUsedAt: new Date().toISOString(),
    },
  })

  return {
    ...user,
    scopes: apiKey.scopes,
  }
}

/**
 * Get the public user object associated with the current session cookie.
 *
 * This is used for requests coming from the ACC frontend.
 */
const getUserFromSessionCookie = async (): Promise<ApiUser | null> => {
  const supabase = createRouteHandlerClient({ cookies })

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
