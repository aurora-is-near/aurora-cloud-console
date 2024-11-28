"use client"

import { createContext, ReactNode, useCallback, useMemo, useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { Filter, FilterEntry } from "@/types/types"
import { ApiRequestBody } from "@/types/api"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { logger } from "@/logger"
import { getFilterEntries } from "@/actions/filter-entries/get-filter-entries"

type FilterProviderProps = {
  filterId: number
  children: ReactNode
}

type FilterUpdateContextType = {
  clearPendingUpdates: () => void
  savePendingUpdates: () => Promise<void>
  queueUpdate: (data: ApiRequestBody<"updateFilter">) => void
  filter?: Filter
  hasPendingUpdates?: boolean
  isUpdating: boolean
  filterEntries: FilterEntry[]
}

export const FilterUpdateContext =
  createContext<FilterUpdateContextType | null>(null)

export const FilterProvider = ({ children, filterId }: FilterProviderProps) => {
  const { data: filter, refetch: refetchFilter } = useQuery(
    getQueryFnAndKey("getFilter", { filter_id: String(filterId) }),
  )

  const [filterEntries, setFilterEntries] = useState<FilterEntry[]>([])

  useQuery({
    queryKey: ["filterEntries", filterId],
    queryFn: async () => {
      const entries = await getFilterEntries(filterId)

      setFilterEntries(entries ?? [])

      return entries
    },
    enabled: !!filterId,
  })

  const getFilterUpdater = useOptimisticUpdater("getFilter", { id: filterId })
  const [pendingUpdate, setPendingUpdate] =
    useState<ApiRequestBody<"updateFilter"> | null>(null)

  const clearPendingUpdates = useCallback(() => {
    setPendingUpdate(null)
    void refetchFilter()
  }, [refetchFilter])

  const { mutate: updateFilter, isPending: isUpdatePending } = useMutation({
    mutationFn: apiClient.updateFilter,
    onSettled: getFilterUpdater.invalidate,
    onSuccess: () => {
      toast.success("Filter updated")
    },
    onError: (error) => {
      toast.error("Failed to update filter")
      logger.error(error)
    },
  })

  const savePendingUpdates = useCallback(async () => {
    if (filter && pendingUpdate) {
      updateFilter({
        filter_id: String(filter.id),
        ...pendingUpdate,
      })
    }

    clearPendingUpdates()
  }, [filter, pendingUpdate, clearPendingUpdates, updateFilter])

  const queueUpdate = useCallback(
    (data: ApiRequestBody<"updateFilter">) => {
      setPendingUpdate((prev) => ({ ...prev, ...data }))
    },
    [setPendingUpdate],
  )

  const value = useMemo(
    (): FilterUpdateContextType => ({
      clearPendingUpdates,
      savePendingUpdates,
      queueUpdate,
      filter,
      hasPendingUpdates: !!pendingUpdate,
      isUpdating: isUpdatePending,
      filterEntries,
    }),
    [
      clearPendingUpdates,
      savePendingUpdates,
      queueUpdate,
      filter,
      pendingUpdate,
      isUpdatePending,
      filterEntries,
    ],
  )

  return (
    <FilterUpdateContext.Provider value={value}>
      {children}
    </FilterUpdateContext.Provider>
  )
}
