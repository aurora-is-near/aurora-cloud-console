"use server"

import { getAuthSession } from "@/actions/auth-session/get-auth-session"
import { isAdminUser } from "@/utils/admin"

export const isAdmin = async (): Promise<boolean> => {
  const user = await getAuthSession()

  return !!user && isAdminUser(user.email)
}
