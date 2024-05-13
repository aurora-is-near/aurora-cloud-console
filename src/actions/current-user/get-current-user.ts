"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { createServerComponentClient } from "@/supabase/create-server-component-client"
import { User } from "@/types/types"

export const getCurrentUser = async (): Promise<User> => {
  const supabase = createServerComponentClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { id } = session?.user ?? {}

  if (!id) {
    throw new Error("No authenticated user found")
  }

  const { data } = await createAdminSupabaseClient()
    .from("users")
    .select()
    .eq("user_id", id)
    .single()

  if (!data) {
    throw new Error("No user found")
  }

  return data
}
