import { ADMIN_EMAIL_DOMAIN } from "@/constants/auth"
import { NextRequest } from "next/server"

export const isAdminUser = (user: { email?: string }) =>
  user.email?.split("@")[1] === ADMIN_EMAIL_DOMAIN

export const isAdminRoute = (req: NextRequest): boolean =>
  new URL(req.url).pathname.split("/")[1] === "admin"
