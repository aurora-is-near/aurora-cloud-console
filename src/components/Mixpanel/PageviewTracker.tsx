"use client"

import { useEffect } from "react"
import { useAnalytics } from "@/hooks/useAnalytics"

export const PageviewTracker = () => {
  const mixPanel = useAnalytics()

  useEffect(() => {
    mixPanel?.track("pageview")
  }, [mixPanel])

  return null
}
