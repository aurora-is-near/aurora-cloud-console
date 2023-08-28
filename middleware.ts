import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { Database } from "./types/supabase"

const unauthenticatedRoutes = ["/login"]
const authenticatedRoutes = ["/borealis/deals", "/silos", "/settings"]

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })
  const pathname = req.nextUrl.pathname

  // Refreshes the session if the session is expired but user has a refresh token
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (pathname === "/" && session) {
    return NextResponse.redirect(new URL("/borealis/deals", req.url))
  }
  if (pathname === "/" && !session)
    return NextResponse.redirect(new URL("/login", req.url))

  if (
    session &&
    unauthenticatedRoutes.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/borealis/deals", req.url))
  }

  if (
    !session &&
    authenticatedRoutes.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - img/ (images in static/img folder)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|img/).*)",
  ],
}
