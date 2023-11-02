import { Updater, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { getQueryKey } from "../utils/api/query-keys";
import { apiClient } from "../utils/api/client";

// See https://tanstack.com/query/v4/docs/react/guides/optimistic-updates
export const useOptimisticUpdater = (operation: keyof typeof apiClient) => {
  const queryClient = useQueryClient();
  const queryKey = useMemo(() => getQueryKey(operation), [operation]);

  /**
   * Set the query data for a given query key.
   */
  const setQueryData = useCallback(async <T = unknown>(
    updater: Updater<T | undefined, T>
  ) => {
    await queryClient.cancelQueries({ queryKey })

    queryClient.setQueryData(queryKey, updater)
  }, [queryClient, queryKey])

  /**
   * Update a query result optimistically.
   */
  const update = useCallback(async <T = unknown>(newData: T) => {
    setQueryData((oldData?: Partial<T>) => ({
      ...oldData,
      ...newData,
    }))
  }, [setQueryData])

  /**
   * Replace a query result optimistically.
   */
  const replace = useCallback(async <T = unknown>(newData: T) => {
    setQueryData(() => newData)
  }, [setQueryData])

  /**
   * Replace a query result optimistically.
   */
  const insert = useCallback(async <T = unknown>(newData: T) => {
    const previousData = queryClient.getQueryData(queryKey)
    const previousDataArray = Array.isArray(previousData) ? previousData : []

    setQueryData(() => [newData, ...previousDataArray])
  }, [queryClient, queryKey, setQueryData])

  /**
   * Invalidate a query to trigger a refetch of the latest data.
   */
  const invalidate = useCallback(() => {
    queryClient.invalidateQueries({ queryKey })

  }, [queryClient, queryKey])

  return {
    update,
    replace,
    insert,
    invalidate,
  }
}
