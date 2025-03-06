"use server"

import { getAuthSession } from "@/actions/auth-session/get-auth-session"
import { isAdminUser } from "@/utils/admin"

export const isAdmin = async (): Promise<boolean> => {
  const session = await getAuthSession()

  return !!session?.user && isAdminUser(session.user.email)
}
