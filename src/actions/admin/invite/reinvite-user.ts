"use server"

import { AUTH_ACCEPT_ROUTE } from "@/constants/routes"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const reinviteUser = async ({
  email,
  origin,
}: {
  email: string
  origin: string
}) => {
  const supabase = createAdminSupabaseClient()
  const { error } = await supabase.auth.resend({
    email,
    type: "signup",
    options: {
      emailRedirectTo: `${origin}${AUTH_ACCEPT_ROUTE}`,
    },
  })

  if (error) {
    throw error
  }
}
