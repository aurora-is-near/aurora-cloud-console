"use server"

import { createServerComponentClient } from "@/supabase/create-server-component-client"
import { isAdminUser } from "@/utils/admin"

export const isAdmin = async (): Promise<boolean> => {
  const supabase = createServerComponentClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return !!session?.user && isAdminUser(session.user.email)
}
