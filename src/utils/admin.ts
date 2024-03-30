import { ADMIN_EMAIL_DOMAIN } from "@/constants/auth"

export const isAdminUser = (user: { email?: string }) =>
  user.email?.split("@")[1] === ADMIN_EMAIL_DOMAIN
