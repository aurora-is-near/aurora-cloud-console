import { LOGIN_ROUTE } from "@/constants/routes"
import { createRouteHandlerClient } from "@/supabase/create-route-handler-client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get("code")

    if (!code) throw new Error("No code found.")

    if (code) {
      const supabase = createRouteHandlerClient()
      await supabase.auth.exchangeCodeForSession(code)
    }

    return NextResponse.redirect(new URL("/borealis/deals", request.url))
  } catch (error) {
    console.error(error)
    const loginUrl = new URL(LOGIN_ROUTE, request.url)
    loginUrl.searchParams.set("error", "login_failed")
    return NextResponse.redirect(loginUrl)
  }
}
