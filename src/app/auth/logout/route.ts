import { NextRequest, NextResponse } from "next/server"
import { createRouteHandlerClient } from "@/supabase/create-route-handler-client"

export async function GET(req: NextRequest) {
  const supabase = await createRouteHandlerClient()

  await supabase.auth.signOut()

  return NextResponse.redirect(new URL("/", req.url))
}
