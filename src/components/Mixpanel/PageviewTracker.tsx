"use client"

import { useEffect } from "react"
import { useMixPanel } from "@/hooks/useMixPanel"

export const PageviewTracker = () => {
  const mixPanel = useMixPanel()

  useEffect(() => {
    mixPanel?.track("pageview")
  }, [mixPanel])

  return null
}
