import { Updater, useQueryClient } from "@tanstack/react-query"
import { useCallback, useMemo } from "react"
import { getQueryKey } from "../utils/api/query-keys"
import { apiClient } from "../utils/api/client"

// See https://tanstack.com/query/v4/docs/react/guides/optimistic-updates
export const useOptimisticUpdater = <
  Operation extends keyof typeof apiClient,
  Data extends Awaited<ReturnType<(typeof apiClient)[Operation]>>,
>(
  operation: Operation,
  params?: any,
) => {
  const queryClient = useQueryClient()
  const queryKey = useMemo(
    () => getQueryKey(operation, params),
    [operation, params],
  )

  /**
   * Set the query data for a given query key.
   */
  const set = useCallback(
    async <T = Data>(updater: Updater<T | undefined, T>) => {
      await queryClient.cancelQueries({ queryKey })

      queryClient.setQueryData(queryKey, updater)
    },
    [queryClient, queryKey],
  )

  /**
   * Update a query result optimistically.
   */
  const update = useCallback(
    async <T = Data>(newData: T) => {
      set((oldData?: Partial<T>) => ({
        ...oldData,
        ...newData,
      }))
    },
    [set],
  )

  /**
   * Replace a query result optimistically.
   */
  const replace = useCallback(
    async (newData: Data) => {
      set(() => newData)
    },
    [set],
  )

  /**
   * Replace a query result optimistically.
   */
  const insert = useCallback(
    async <T = Data>(newData: T) => {
      const previousData = queryClient.getQueryData(queryKey)
      const previousDataArray = Array.isArray(previousData) ? previousData : []

      set(() => [newData, ...previousDataArray])
    },
    [queryClient, queryKey, set],
  )

  /**
   * Invalidate a query to trigger a refetch of the latest data.
   */
  const invalidate = useCallback(() => {
    queryClient.invalidateQueries({ queryKey })
  }, [queryClient, queryKey])

  return {
    set,
    update,
    replace,
    insert,
    invalidate,
  }
}
