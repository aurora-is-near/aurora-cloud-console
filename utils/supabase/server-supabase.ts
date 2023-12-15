import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cache } from "react"
import { cookies } from "next/headers"
import { Database } from "@/types/supabase"

export const serverSupabase = cache(() => {
  const cookieStore = cookies()

  return createServerComponentClient<Database>({ cookies: () => cookieStore })
})
