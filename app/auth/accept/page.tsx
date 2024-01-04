"use client"

import { LOGIN_ROUTE } from "@/constants/routes"
import { createClientComponentClient } from "@/supabase/create-client-component-client"
import { useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"

export default function Page() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const setSession = useCallback(async () => {
    const hashParams = new URLSearchParams(
      window.location.hash.replace(/^#/, ""),
    )

    await supabase.auth.setSession({
      refresh_token: hashParams.get("refresh_token") ?? "",
      access_token: hashParams.get("access_token") ?? "",
    })

    router.push(LOGIN_ROUTE)
  }, [router, supabase.auth])

  useEffect(() => {
    void setSession()
  }, [setSession])

  return null
}
