"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { createRouteHandlerClient } from "@/supabase/create-route-handler-client"
import { User } from "@/types/types"

export const getCurrentUser = async (): Promise<User | null> => {
  const supabase = createRouteHandlerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { id } = session?.user ?? {}

  if (!id) {
    return null
  }

  const { data } = await createAdminSupabaseClient()
    .from("users")
    .select()
    .eq("user_id", id)
    .single()

  return data
}
