"use server"

import { getAuthUser } from "@/actions/auth-user/get-auth-user"
import { isAdminUser } from "@/utils/admin"

export const isAdmin = async (): Promise<boolean> => {
  const user = await getAuthUser()

  return !!user && isAdminUser(user.email)
}
