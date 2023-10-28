import { Session, createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { Database } from "./types/supabase"

const unauthenticatedRoutes = ["/login"]
const authenticatedRoutes = ["/borealis", "/silos", "/users", "/settings"]

const redirectToLogin = (req: NextRequest) => {
  return NextResponse.redirect(new URL("/login", req.url))
}

const redirectToBorealisDeals = (req: NextRequest) => {
  return NextResponse.redirect(new URL("/borealis/deals", req.url))
}

const handleHomeRoute = (req: NextRequest, session: Session | null) => {
  if (session) {
    return redirectToBorealisDeals(req)
  }

  return redirectToLogin(req)
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })
  const pathname = req.nextUrl.pathname

  // Refreshes the session if the session is expired but user has a refresh token
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (pathname === "/") {
    return handleHomeRoute(req, session)
  }

  if (
    session &&
    unauthenticatedRoutes.some((route) => pathname.startsWith(route))
  ) {
    return redirectToBorealisDeals(req)
  }

  if (
    !session &&
    authenticatedRoutes.some((route) => pathname.startsWith(route))
  ) {
    return redirectToLogin(req)
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
