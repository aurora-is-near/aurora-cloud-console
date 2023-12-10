import { NextRequest, NextResponse } from "next/server"
import { adminSupabase } from "@/utils/supabase"
import { apiRequestHandler } from "@/utils/api"

export const POST = apiRequestHandler(["admin"], async (req: NextRequest) => {
  const { email } = await req.json()
  const supabase = adminSupabase()
  const { error } = await supabase.auth.resend({
    email,
    type: "signup",
    options: {
      emailRedirectTo: req.nextUrl.origin,
    },
  })

  if (error) {
    throw error
  }

  return NextResponse.json({ status: "OK" })
})
