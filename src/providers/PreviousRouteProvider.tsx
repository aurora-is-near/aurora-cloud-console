"use client"

import { usePathname, useSearchParams } from "next/navigation"
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
  const searchParams = useSearchParams()

  const [previousRoute, setPreviousRoute] = useState<string | null>(null)
  const [currentRoute, setCurrentRoute] = useState<string | null>(null)

  useEffect(() => {
    setPreviousRoute(currentRoute)
    setCurrentRoute(`${pathname}?${searchParams}`)
  }, [currentRoute, pathname, searchParams])

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
