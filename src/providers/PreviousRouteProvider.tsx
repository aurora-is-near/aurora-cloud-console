"use client"

import { usePathname } from "next/navigation"
import { createContext, ReactNode, useEffect, useMemo, useState } from "react"

type PreviousRouteContextType = {
  previousRoute: string | null
}

export const PreviousRouteContext =
  createContext<PreviousRouteContextType | null>(null)

export const PreviousRouteProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const pathname = usePathname()

  const [previousRoute, setPreviousRoute] = useState<string | null>(null)
  const [currentRoute, setCurrentRoute] = useState<string | null>(null)

  useEffect(() => {
    const { search } = window.location

    setPreviousRoute(currentRoute)
    setCurrentRoute(search ? `${pathname}?${search}` : pathname)
  }, [currentRoute, pathname])

  const ctx = useMemo(
    () => ({
      previousRoute,
    }),
    [previousRoute],
  )

  return (
    <PreviousRouteContext.Provider value={ctx}>
      {children}
    </PreviousRouteContext.Provider>
  )
}
