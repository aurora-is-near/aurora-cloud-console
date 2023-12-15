import { ADMIN_EMAIL_DOMAIN } from "@/constants/auth"
import { User } from "@supabase/supabase-js"

export const isAdminUser = (user: { email?: string }) =>
  user.email?.split("@")[1] === ADMIN_EMAIL_DOMAIN
