import { createRouteHandlerClient } from "@/supabase/create-route-handler-client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient()
  await supabase.auth.signOut()

  return NextResponse.redirect(new URL("/", req.url))
}
