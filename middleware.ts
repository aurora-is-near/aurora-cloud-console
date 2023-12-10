import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { Database } from "./types/supabase"
import { getTeamKey } from "@/utils/team-key"
import {
  AUTH_CALLBACK_ROUTE,
  LOGIN_ROUTE,
  LOGIN_UNAUTHORISED_ROUTE,
} from "./constants/routes"

const ADMIN_EMAIL_DOMAIN = "aurora.dev"

const redirect = (req: NextRequest, res: NextResponse, route: string) => {
  const pathname = req.nextUrl.pathname

  if (pathname === route) {
    return res
  }

  return NextResponse.redirect(new URL(route, req.url))
}

const loginRedirect = (req: NextRequest, res: NextResponse) =>
  redirect(req, res, "/login")

const dealsRedirect = (req: NextRequest, res: NextResponse) =>
  redirect(req, res, "/borealis/deals")

const unauthorisedRedirect = (req: NextRequest, res: NextResponse) =>
  redirect(req, res, LOGIN_UNAUTHORISED_ROUTE)

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })
  const pathname = req.nextUrl.pathname

  // Refreshes the session if the session is expired but user has a refresh token
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Bail if an auth callback is in progress
  if (pathname === AUTH_CALLBACK_ROUTE) {
    return res
  }

  // Redirect to the login page if the user is not logged in
  if (!session) {
    return loginRedirect(req, res)
  }

  const teamKey = getTeamKey(req)

  // Redirect to the unauthorised page if there is not site key or if the user
  // is not a member of the associated team, or an admin user.
  if (
    !teamKey ||
    !(
      session.user.user_metadata.teams?.includes(teamKey) ||
      session.user.email?.split("@")[1] === ADMIN_EMAIL_DOMAIN
    )
  ) {
    return unauthorisedRedirect(req, res)
  }

  // Finally, redirect to the deals page if the user is logged in and on any
  // of the login pages, or the base path.
  if (
    session &&
    ["/", LOGIN_ROUTE, LOGIN_UNAUTHORISED_ROUTE].includes(pathname)
  ) {
    return dealsRedirect(req, res)
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
