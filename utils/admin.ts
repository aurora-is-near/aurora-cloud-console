import { ADMIN_EMAIL_DOMAIN } from "@/constants/auth"
import { NextRequest } from "next/server"

export const isAdminUser = (user: { email?: string }) =>
  user.email?.split("@")[1] === ADMIN_EMAIL_DOMAIN

export const isAdminSubdomain = (req: NextRequest) => {
  const host = req.headers.get("host")

  if (!host?.includes(".")) {
    return null
  }

  const [subdomain] = host.split(".")

  return subdomain === "admin"
}
