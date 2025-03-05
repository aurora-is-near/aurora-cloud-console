"use server"

import { Session } from "@supabase/supabase-js"
import { createServerComponentClient } from "@/supabase/create-server-component-client"

export const getSession = async (): Promise<Session | null> => {
  const supabase = createServerComponentClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session
}
