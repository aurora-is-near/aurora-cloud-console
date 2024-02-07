import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { findCurrentTeam } from "@/utils/current-team"
import {
  AUTH_CALLBACK_ROUTE,
  AUTH_ACCEPT_ROUTE,
  LOGIN_ROUTE,
  LOGIN_UNAUTHORISED_ROUTE,
  LOGIN_UNKNOWN_ROUTE,
  LOGOUT_ROUTE,
  HOME_ROUTE,
} from "./constants/routes"
import { isAdminSubdomain, isAdminUser } from "@/utils/admin"
import { createMiddlewareClient } from "@/supabase/create-middleware-client"
import { Session } from "@supabase/supabase-js"

const redirect = (req: NextRequest, res: NextResponse, route: string) => {
  const pathname = req.nextUrl.pathname

  if (pathname === route) {
    return res
  }

  return NextResponse.redirect(new URL(route, req.url))
}

const loginRedirect = (req: NextRequest, res: NextResponse) =>
  redirect(req, res, LOGIN_ROUTE)

const dealsRedirect = (req: NextRequest, res: NextResponse) =>
  redirect(req, res, HOME_ROUTE)

const unauthorisedRedirect = (req: NextRequest, res: NextResponse) =>
  redirect(req, res, LOGIN_UNAUTHORISED_ROUTE)

const unknownRedirect = (req: NextRequest, res: NextResponse) =>
  redirect(req, res, LOGIN_UNKNOWN_ROUTE)

const rewriteAdminSubdomain = (req: NextRequest, session: Session) => {
  const res = NextResponse.next()
  const { pathname } = req.nextUrl

  if (!isAdminUser(session.user)) {
    return unauthorisedRedirect(req, res)
  }

  if (pathname.startsWith("/admin")) {
    return redirect(req, res, pathname.replace(/^\/admin/, ""))
  }

  return NextResponse.rewrite(
    new URL(`/admin${req.nextUrl.pathname.replace(/^\/admin/, "")}`, req.url),
  )
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
  ] = await Promise.all([
    supabase.auth.getSession(),
    findCurrentTeam(req.headers),
  ])

  const { team_key: teamKey } = team ?? {}

  // Show the unknown team page if no team found for the current subdomain, and
  // this is not a request for the admin subdomain
  if (!teamKey && !isAdminSubdomain(req)) {
    return unknownRedirect(req, res)
  }

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

  // Rewrite admin subdomain to /admin
  // e.g. https://admin.auroracloud.dev/teams > /admin/teams
  if (isAdminSubdomain(req)) {
    return rewriteAdminSubdomain(req, session)
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

  // Finally, redirect to the deals page if the user is logged in and on any
  // of the login pages, or the base path
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
