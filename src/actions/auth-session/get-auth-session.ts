"use server"

import { User } from "@supabase/supabase-js"
import { createServerComponentClient } from "@/supabase/create-server-component-client"

export const getAuthSession = async (): Promise<User | null> => {
  const supabase = createServerComponentClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}
