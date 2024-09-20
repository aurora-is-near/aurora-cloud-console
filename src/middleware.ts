import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { isAdminUser } from "@/utils/admin"
import { createMiddlewareClient } from "@/supabase/create-middleware-client"
import {
  AUTH_ACCEPT_ROUTE,
  AUTH_CALLBACK_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  LOGOUT_ROUTE,
  UNAUTHORISED_ROUTE,
} from "./constants/routes"

const redirect = (req: NextRequest, res: NextResponse, route: string) => {
  const { pathname } = req.nextUrl

  if (pathname === route) {
    return res
  }

  return NextResponse.redirect(new URL(route, req.url))
}

const loginRedirect = (req: NextRequest, res: NextResponse) =>
  redirect(req, res, LOGIN_ROUTE)

const homeRedirect = (req: NextRequest, res: NextResponse) =>
  redirect(req, res, HOME_ROUTE)

const unauthorisedRedirect = (req: NextRequest, res: NextResponse) =>
  redirect(req, res, UNAUTHORISED_ROUTE)

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient(req)
  const { pathname } = req.nextUrl
  const pathParts = pathname.split("/")
  const isDashboardRoute = pathParts[1] === "dashboard"
  const teamKey = isDashboardRoute ? pathParts[2] : null

  const [
    {
      data: { session },
    },
  ] = await Promise.all([supabase.auth.getSession()])

  // Do nothing if an auth callback or logout is in progress
  if (
    [
      AUTH_CALLBACK_ROUTE,
      AUTH_ACCEPT_ROUTE,
      LOGOUT_ROUTE,
      UNAUTHORISED_ROUTE,
    ].includes(pathname)
  ) {
    return res
  }

  // Do nothing for API requests (which are authenticated separately)
  if (pathname.startsWith("/api")) {
    return res
  }

  // Redirect to the login page if the user is not logged in
  if (!session) {
    return loginRedirect(req, res)
  }

  // Do nothing if viewing the main dashboard route where we select a team
  if (HOME_ROUTE === pathname) {
    return res
  }

  // Redirect to the unauthorised page if viewing a dashboard page and there is
  // no team key, or the user is not authorised to access that team.
  if (
    isDashboardRoute &&
    !(
      session.user.user_metadata.teams?.includes(teamKey) ||
      isAdminUser(session.user)
    )
  ) {
    return unauthorisedRedirect(req, res)
  }

  // Finally, redirect to the home page if the user is logged in and on any
  // of the login pages, or the base path
  if (session && ["/", LOGIN_ROUTE].includes(pathname)) {
    return homeRedirect(req, res)
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - img/ (images in static/img folder)
     * - monitoring-tunnel (Sentry monitoring tunnel)
     */
    "/((?!_next/static|_next/image|favicon.ico|img/|monitoring-tunnel).*)",
  ],
}
