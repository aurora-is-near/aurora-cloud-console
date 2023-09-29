import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cache } from "react"
import { cookies } from "next/headers"
import { Database } from "@/types/supabase"

const serverSupabase = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
})

export default serverSupabase
