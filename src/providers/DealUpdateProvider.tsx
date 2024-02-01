"use client"

import { ReactNode, createContext, useCallback, useMemo, useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getQueryKey } from "@/utils/api/query-keys"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { Deal } from "@/types/types"

type DealUpdateProviderProps = {
  dealId: number
  children: ReactNode
}

type DealContextType = {
  resetDeal: () => void
  deal?: Deal
  hasPendingUpdates?: boolean
}

export const DealContext = createContext<DealContextType | null>(null)

export function DealUpdateProvider({
  children,
  dealId,
}: DealUpdateProviderProps) {
  const queryClient = useQueryClient()
  const { data: deal } = useQuery(getQueryFnAndKey("getDeal", { id: dealId }))
  const [hasPendingUpdates, setHasPendingUpdates] = useState(false)

  const resetDeal = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: getQueryKey("getDeal") })
  }, [queryClient])

  const value = useMemo(
    (): DealContextType => ({ resetDeal, deal, hasPendingUpdates }),
    [resetDeal, deal, hasPendingUpdates],
  )

  return <DealContext.Provider value={value}>{children}</DealContext.Provider>
}
