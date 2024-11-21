import { createClient } from "@supabase/supabase-js"
import { Database } from "@/types/supabase_deals"
import { COMMON_SERVER_OPTIONS } from "../common-options"

export const createAdminDealsSupabaseClient = () => {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_DEALS_URL,
    process.env.SUPABASE_DEALS_SERVICE_ROLE_KEY,
    {
      ...COMMON_SERVER_OPTIONS,
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    },
  )
}
