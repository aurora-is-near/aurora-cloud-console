import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { findCurrentTeam } from "@/utils/current-team"
import {
  AUTH_CALLBACK_ROUTE,
  AUTH_ACCEPT_ROUTE,
  LOGIN_ROUTE,
  UNAUTHORISED_ROUTE,
  UNKNOWN_ROUTE,
  LOGOUT_ROUTE,
  HOME_ROUTE,
} from "./constants/routes"
import { isAdminRoute, isAdminUser } from "@/utils/admin"
import { createMiddlewareClient } from "@/supabase/create-middleware-client"

const redirect = (req: NextRequest, res: NextResponse, route: string) => {
  const pathname = req.nextUrl.pathname

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

const unknownRedirect = (req: NextRequest, res: NextResponse) =>
  redirect(req, res, UNKNOWN_ROUTE)

const handleInvalidRoute = (req: NextRequest, res: NextResponse) => {
  if (req.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.rewrite(new URL("/404", req.url))
  }

  return unknownRedirect(req, res)
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient(req)
  const pathname = req.nextUrl.pathname

  const [
    {
      data: { session },
    },
    team,
  ] = await Promise.all([supabase.auth.getSession(), findCurrentTeam(req)])

  const { team_key: teamKey } = team ?? {}
  const isValidRoute = !!teamKey || isAdminRoute(req)

  // Do nothing if an auth callback or logout is in progress
  if (
    [AUTH_CALLBACK_ROUTE, AUTH_ACCEPT_ROUTE, LOGOUT_ROUTE].includes(pathname)
  ) {
    return res
  }

  // Redirect to the login page if the user is not logged in
  if (!session) {
    return loginRedirect(req, res)
  }

  // Redirect away from the unknown team page if there is a valid team associated
  // with the current route
  if (pathname === UNKNOWN_ROUTE && isValidRoute) {
    return homeRedirect(req, res)
  }

  // Redirect to the unauthorised page if there is no team key, or if the user
  // is not authorised to access that team
  if (
    !(
      session.user.user_metadata.teams?.includes(teamKey) ||
      isAdminUser(session.user)
    )
  ) {
    return unauthorisedRedirect(req, res)
  }

  // Finally, redirect to the home page if the user is logged in and on any
  // of the login pages, or the base path
  if (session && ["/", LOGIN_ROUTE, UNAUTHORISED_ROUTE].includes(pathname)) {
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
     */
    "/((?!_next/static|_next/image|favicon.ico|img/).*)",
  ],
}
