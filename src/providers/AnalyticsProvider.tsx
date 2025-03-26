"use client"

import mixpanelBrowser, { Mixpanel } from "mixpanel-browser"
import { createContext, ReactNode, useEffect, useMemo, useState } from "react"
import * as analytics from "@/actions/analytics"

type AnalyticsContextType = {
  mixPanel: Mixpanel | null
}

export const AnalyticsContext = createContext<AnalyticsContextType | null>(null)

export const AnalyticsProvider = ({ children }: { children: ReactNode }) => {
  const [mixPanel, setMixPanel] = useState<Mixpanel | null>(null)

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN

    if (!token) {
      return
    }

    mixpanelBrowser.init(token, {
      debug: false, // Use only locally please
      track_pageview: true,
      persistence: "localStorage",
    })

    setMixPanel(mixpanelBrowser)
  }, [])

  useEffect(() => {
    void analytics.setUser()
  }, [])

  const ctx = useMemo(
    () => ({
      mixPanel,
    }),
    [mixPanel],
  )

  return (
    <AnalyticsContext.Provider value={ctx}>
      {children}
    </AnalyticsContext.Provider>
  )
}
