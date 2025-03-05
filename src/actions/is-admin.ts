"use server"

import { getSession } from "@/actions/session/get-session"
import { isAdminUser } from "@/utils/admin"

export const isAdmin = async (): Promise<boolean> => {
  const session = await getSession()

  return !!session?.user && isAdminUser(session.user.email)
}
