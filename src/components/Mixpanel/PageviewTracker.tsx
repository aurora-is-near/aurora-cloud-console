"use client"

import mixpanel from "mixpanel-browser"
import { useEffect } from "react"

export const PageviewTracker = () => {
  useEffect(() => {
    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN ?? "", {
      debug: false, // Use only locally please
      track_pageview: true,
      persistence: "localStorage",
    })
    mixpanel.track("pageview")
  }, [])

  return null
}
