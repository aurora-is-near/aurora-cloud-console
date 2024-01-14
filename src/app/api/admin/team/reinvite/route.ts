import { NextRequest, NextResponse } from "next/server"
import { apiRequestHandler } from "@/utils/api"
import { AUTH_ACCEPT_ROUTE } from "@/constants/routes"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const POST = apiRequestHandler(["admin"], async (req: NextRequest) => {
  const { email } = await req.json()
  const supabase = createAdminSupabaseClient()
  const { error } = await supabase.auth.resend({
    email,
    type: "signup",
    options: {
      emailRedirectTo: `${req.nextUrl.origin}${AUTH_ACCEPT_ROUTE}`,
    },
  })

  if (error) {
    throw error
  }

  return NextResponse.json({ status: "OK" })
})
