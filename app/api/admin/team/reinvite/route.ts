import { NextRequest, NextResponse } from "next/server"
import { adminSupabase } from "@/utils/supabase/admin-supabase"
import { apiRequestHandler } from "@/utils/api"
import { LOGIN_ACCEPT_ROUTE } from "@/constants/routes"

export const POST = apiRequestHandler(["admin"], async (req: NextRequest) => {
  const { email } = await req.json()
  const supabase = adminSupabase()
  const { error } = await supabase.auth.resend({
    email,
    type: "signup",
    options: {
      emailRedirectTo: `${req.nextUrl.origin}/${LOGIN_ACCEPT_ROUTE}`,
    },
  })

  if (error) {
    throw error
  }

  return NextResponse.json({ status: "OK" })
})
