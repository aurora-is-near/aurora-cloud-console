import { NextRequest, NextResponse } from "next/server"
import { createRouteHandlerClient } from "@/supabase/create-route-handler-client"
import * as analytics from "@/actions/analytics"

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient()

  await supabase.auth.signOut()
  await analytics.clearUser()

  return NextResponse.redirect(new URL("/", req.url))
}
