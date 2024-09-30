import { ADMIN_EMAIL_DOMAIN } from "@/constants/auth"

export const isAdminUser = (email?: string) =>
  email?.split("@")[1] === ADMIN_EMAIL_DOMAIN
