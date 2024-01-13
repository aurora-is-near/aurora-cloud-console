import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cache } from "react"
import { cookies } from "next/headers"

export const serverSupabase = cache(() => {
  const cookieStore = cookies()

  return createServerComponentClient({ cookies: () => cookieStore })
})
