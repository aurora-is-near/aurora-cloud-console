"use client"

import { createContext, ReactNode, useCallback, useMemo, useState } from "react"
import {
  QueryObserverResult,
  RefetchOptions,
  UseMutateFunction,
  useMutation,
  useQuery,
} from "@tanstack/react-query"
import toast from "react-hot-toast"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { Filter, FilterEntry } from "@/types/types"
import { ApiRequestBody } from "@/types/api"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { logger } from "@/logger"

type FilterProviderProps = {
  filterId: number
  children: ReactNode
}

type FilterUpdateContextType = {
  clearPendingUpdates: () => void
  savePendingUpdates: () => Promise<void>
  queueUpdate: (data: ApiRequestBody<"updateFilter">) => void
  queueEntriesUpdate: (data: ApiRequestBody<"updateFilterEntries">) => void
  refetchFilterEntries: (options?: RefetchOptions) => Promise<
    QueryObserverResult<{
      items: { value: string; id: number; filter_id: number }[]
    }>
  >
  deleteFilterEntry: UseMutateFunction<
    null,
    Error,
    { id: number; filter_id: number }
  >
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

  const { data: filterEntries, refetch: refetchFilterEntries } = useQuery(
    getQueryFnAndKey("getFilterEntries", { filter_id: String(filterId) }),
  )

  const getFilterUpdater = useOptimisticUpdater("getFilter", { id: filterId })
  const [pendingUpdate, setPendingUpdate] =
    useState<ApiRequestBody<"updateFilter"> | null>(null)

  const [pendingEntriesUpdate, setPendingEntriesUpdate] =
    useState<ApiRequestBody<"updateFilterEntries"> | null>(null)

  const clearPendingUpdates = useCallback(() => {
    setPendingUpdate(null)
    setPendingEntriesUpdate(null)
    void refetchFilter()
    void refetchFilterEntries()
  }, [refetchFilter, refetchFilterEntries])

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

  const { mutate: updateFilterEntries, isPending: isUpdateEntriesPending } =
    useMutation({
      mutationFn: apiClient.updateFilterEntries,
      onSettled: getFilterUpdater.invalidate,
      onSuccess: () => {
        toast.success("Filter entries updated")
      },
      onError: (error) => {
        toast.error("Failed to update filter entries")
        logger.error(error)
      },
    })

  const { mutate: deleteFilterEntry, isPending: isDeleteEntryPending } =
    useMutation({
      mutationFn: apiClient.deleteFilterEntry,
      onSettled: getFilterUpdater.invalidate,
    })

  const savePendingUpdates = useCallback(async () => {
    if (filter) {
      if (pendingUpdate) {
        updateFilter({
          filter_id: String(filter.id),
          ...pendingUpdate,
        })
      }

      if (pendingEntriesUpdate) {
        updateFilterEntries({
          filter_id: String(filter.id),
          ...pendingEntriesUpdate,
        })
      }
    }

    clearPendingUpdates()
  }, [
    filter,
    pendingUpdate,
    pendingEntriesUpdate,
    clearPendingUpdates,
    updateFilter,
    updateFilterEntries,
  ])

  const queueUpdate = useCallback(
    (data: ApiRequestBody<"updateFilter">) => {
      setPendingUpdate((prev) => ({ ...prev, ...data }))
    },
    [setPendingUpdate],
  )

  const queueEntriesUpdate = useCallback(
    (data: ApiRequestBody<"updateFilterEntries">) => {
      setPendingEntriesUpdate((prev) => ({ ...prev, ...data }))
    },
    [setPendingEntriesUpdate],
  )

  const value = useMemo(
    (): FilterUpdateContextType => ({
      clearPendingUpdates,
      savePendingUpdates,
      queueUpdate,
      queueEntriesUpdate,
      refetchFilterEntries,
      deleteFilterEntry,
      filter,
      hasPendingUpdates:
        !!pendingUpdate || !!pendingEntriesUpdate || !!deleteFilterEntry,
      isUpdating:
        isUpdatePending || isUpdateEntriesPending || isDeleteEntryPending,
      filterEntries: filterEntries?.items ?? [],
    }),
    [
      clearPendingUpdates,
      savePendingUpdates,
      queueUpdate,
      queueEntriesUpdate,
      refetchFilterEntries,
      filter,
      pendingUpdate,
      pendingEntriesUpdate,
      isUpdatePending,
      isUpdateEntriesPending,
      isDeleteEntryPending,
      deleteFilterEntry,
      filterEntries,
    ],
  )

  return (
    <FilterUpdateContext.Provider value={value}>
      {children}
    </FilterUpdateContext.Provider>
  )
}
