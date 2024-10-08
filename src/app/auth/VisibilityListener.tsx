"use client"

import { useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@/supabase/create-client-component-client"
import { HOME_ROUTE } from "@/constants/routes"

export const VisibilityListener = () => {
  const supabase = createClientComponentClient()
  const router = useRouter()

  /**
   * Handle visibility change (i.e. when the user focuses on the browser tab).
   *
   * If the user is authenticated and the current path is an auth route, we
   * redirect them to the home page. This is useful when the user logs in from
   * another tab, for example.
   */
  const onVisibilityChange = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session) {
      router.push(HOME_ROUTE)
    }
  }, [supabase.auth, router])

  useEffect(() => {
    document.addEventListener("visibilitychange", onVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange)
    }
  }, [onVisibilityChange])

  return null
}
