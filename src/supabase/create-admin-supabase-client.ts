import { createClient } from "@supabase/supabase-js"
import { Database } from "@/types/supabase"
import { COMMON_SERVER_OPTIONS } from "./common-options"

export const createAdminSupabaseClient = () => {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
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
