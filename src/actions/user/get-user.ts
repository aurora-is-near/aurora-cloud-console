"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { User } from "@/types/types"

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const supabase = createAdminSupabaseClient()
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .maybeSingle()

  return data
}
