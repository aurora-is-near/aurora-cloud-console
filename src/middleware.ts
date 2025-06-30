import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { isAdminUser } from "@/utils/admin"
import { createMiddlewareClient } from "@/supabase/create-middleware-client"
import { isTeamWidgetUrl } from "@/utils/widgets"
import { getFirstTeamSiloId } from "@/actions/team-silos/get-first-team-silo-id"
import {
  AUTH_ACCEPT_ROUTE,
  AUTH_CALLBACK_ROUTE,
  EMAIL_PREVIEW_ROUTE,
  HOME_ROUTE,
  IMAGES_ROUTE,
  LINK_SENT_ROUTE,
  LOGIN_ROUTE,
  LOGOUT_ROUTE,
  SIGNUP_ROUTE,
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

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Do nothing if an auth callback or logout is in progress
  if (
    [
      AUTH_CALLBACK_ROUTE,
      AUTH_ACCEPT_ROUTE,
      LOGOUT_ROUTE,
      UNAUTHORISED_ROUTE,
      LINK_SENT_ROUTE,
      SIGNUP_ROUTE,
    ].includes(pathname)
  ) {
    return res
  }

  // Allow requests for images services via our image resizer
  if (pathname.startsWith(IMAGES_ROUTE)) {
    return res
  }

  // Do nothing for email preview routes
  if (pathname.startsWith(EMAIL_PREVIEW_ROUTE)) {
    return res
  }

  // Do nothing for API requests (which are authenticated separately)
  if (pathname.startsWith("/api")) {
    return res
  }

  // Do nothing for widget requests (which do not require authentication)
  if (teamKey && isTeamWidgetUrl(teamKey, pathname)) {
    return res
  }

  // Redirect to the login page if the user is not logged in
  if (!user) {
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
    !(user.user_metadata.teams?.includes(teamKey) || isAdminUser(user.email))
  ) {
    return unauthorisedRedirect(req, res)
  }

  // Finally, redirect to the home page if the user is logged in and on any
  // of the login pages, or the base path
  if (user && ["/", LOGIN_ROUTE].includes(pathname)) {
    return homeRedirect(req, res)
  }

  // Redirect to the correct silo or empty team page for certain routes.
  if (
    teamKey &&
    [`/dashboard/${teamKey}`, `/dashboard/${teamKey}/silos`].includes(pathname)
  ) {
    const siloId = await getFirstTeamSiloId(teamKey)
    const correctRoute = siloId
      ? `/dashboard/${teamKey}/silos/${siloId}`
      : `/dashboard/${teamKey}`

    if (pathname !== correctRoute) {
      return NextResponse.redirect(new URL(correctRoute, req.url))
    }
  }

  // Redirect to the team settings page if we hit the settings route directly.
  if (pathname === `/dashboard/${teamKey}/settings`) {
    return NextResponse.redirect(
      new URL(`/dashboard/${teamKey}/settings/team`, req.url),
    )
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - static/ (static content in the static/ folder)
     * - favicon.ico (favicon file)
     * - monitoring-tunnel (Sentry monitoring tunnel)
     */
    "/((?!_next/static|_next/image|static/|favicon.ico|monitoring-tunnel).*)",
  ],
}
