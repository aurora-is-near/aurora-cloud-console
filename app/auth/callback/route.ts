import { Database } from "@/types/supabase"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get("code")

    if (!code) throw new Error("No code found.")

    if (code) {
      const supabase = createRouteHandlerClient<Database>({ cookies })
      await supabase.auth.exchangeCodeForSession(code)
    }

    return NextResponse.redirect(new URL("/borealis/deals", request.url))
  } catch (error) {
    console.error(error)
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("error", "login_failed")
    return NextResponse.redirect(loginUrl)
  }
}
