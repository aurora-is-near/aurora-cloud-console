"use client"

import { ReactNode, createContext, useCallback, useMemo, useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { DealSchema } from "@/types/api-schemas"
import { ApiRequestBody } from "@/types/api"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"

type DealUpdateProviderProps = {
  dealId: number
  children: ReactNode
}

type DealFilters = {
  chainFilterListId?: number | null
  contractFilterListId?: number | null
  eoaFilterListId?: number | null
  eoaBlacklistListId?: number | null
}

type DealUpdateContextType = {
  clearPendingUpdates: () => void
  savePendingUpdates: () => Promise<void>
  setFilters: (filters: DealFilters) => void
  deal?: DealSchema
  hasPendingUpdates?: boolean
  isUpdating: boolean
}

export const DealUpdateContext = createContext<DealUpdateContextType | null>(
  null,
)

export function DealUpdateProvider({
  children,
  dealId,
}: DealUpdateProviderProps) {
  const { data: deal, refetch: refetchDeal } = useQuery(
    getQueryFnAndKey("getDeal", { id: dealId }),
  )

  const getDealUpdater = useOptimisticUpdater("getDeal", { id: dealId })
  const [pendingUpdate, setPendingUpdate] =
    useState<ApiRequestBody<"updateDeal"> | null>(null)

  const clearPendingUpdates = useCallback(() => {
    setPendingUpdate(null)
    refetchDeal()
  }, [refetchDeal])

  const { mutate: updateDeal, isPending: isUpdatePending } = useMutation({
    mutationFn: apiClient.updateDeal,
    onSettled: getDealUpdater.invalidate,
    onSuccess: () => {
      toast.success("Deal updated")
    },
    onError: (error) => {
      toast.error("Failed to update deal")
      console.error(error)
    },
  })

  const savePendingUpdates = useCallback(async () => {
    if (deal && pendingUpdate) {
      await updateDeal({ id: deal.id, ...pendingUpdate })
    }

    clearPendingUpdates()
  }, [deal, pendingUpdate, clearPendingUpdates, updateDeal])

  const setFilters = useCallback(
    (filters: DealFilters) => {
      setPendingUpdate((prev) => ({ ...prev, ...filters }))
    },
    [setPendingUpdate],
  )

  const value = useMemo(
    (): DealUpdateContextType => ({
      clearPendingUpdates,
      savePendingUpdates,
      setFilters,
      deal,
      hasPendingUpdates: !!pendingUpdate,
      isUpdating: isUpdatePending,
    }),
    [
      clearPendingUpdates,
      savePendingUpdates,
      setFilters,
      deal,
      pendingUpdate,
      isUpdatePending,
    ],
  )

  return (
    <DealUpdateContext.Provider value={value}>
      {children}
    </DealUpdateContext.Provider>
  )
}
