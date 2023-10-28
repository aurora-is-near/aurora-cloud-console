import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cache } from "react"
import { cookies } from "next/headers"
import { Database } from "@/types/supabase"
import { createClient } from "@supabase/supabase-js"
import { getRequiredEnvVar } from "./env"

export const serverSupabase = cache(() => {
  const cookieStore = cookies()

  return createServerComponentClient<Database>({ cookies: () => cookieStore })
})

export const adminSupabase = () => {
  const supabaseUrl = getRequiredEnvVar('NEXT_PUBLIC_SUPABASE_URL')
  const supabaseKey = getRequiredEnvVar('SUPABASE_SERVICE_ROLE_KEY')

  return createClient<Database>(
    supabaseUrl,
    supabaseKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    }
  )
}
