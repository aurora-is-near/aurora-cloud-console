"use client"

import { ReactNode, createContext, useCallback, useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { DealSchema } from "@/types/api-schemas"

type DealUpdateProviderProps = {
  dealId: number
  children: ReactNode
}

type DealContextType = {
  resetDeal: () => void
  deal?: DealSchema
  hasPendingUpdates?: boolean
}

export const DealContext = createContext<DealContextType | null>(null)

export function DealUpdateProvider({
  children,
  dealId,
}: DealUpdateProviderProps) {
  const { data: deal, refetch: refetchDeal } = useQuery(
    getQueryFnAndKey("getDeal", { id: dealId }),
  )
  const [hasPendingUpdates, setHasPendingUpdates] = useState(false)

  const resetDeal = useCallback(() => {
    refetchDeal()
  }, [refetchDeal])

  const value = useMemo(
    (): DealContextType => ({ resetDeal, deal, hasPendingUpdates }),
    [resetDeal, deal, hasPendingUpdates],
  )

  return <DealContext.Provider value={value}>{children}</DealContext.Provider>
}
