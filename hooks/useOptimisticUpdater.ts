import { Updater, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { getQueryKey } from "../utils/api/query-keys";
import { apiClient } from "../utils/api/client";

type Context = { previousData?: unknown };

// See https://tanstack.com/query/v4/docs/react/guides/optimistic-updates
export const useOptimisticUpdater = (operation: keyof typeof apiClient) => {
  const queryClient = useQueryClient();
  const queryKey = useMemo(() => getQueryKey(operation), [operation]);

  /**
   * Set the query data for a given query key.
   *
   * Cancels any outgoing queries (so they don't overwrite our optimistic
   * update) and returns a snapshot of the previous data (so we can revert if
   * needed).
   */
  const setQueryData = useCallback(async <T = unknown>(
    updater: Updater<T | undefined, T>
  ): Promise<Context> => {
    await queryClient.cancelQueries({ queryKey })

    const previousData = queryClient.getQueryData(queryKey)

    queryClient.setQueryData(queryKey, updater)

    return { previousData }
  }, [queryClient, queryKey])

  /**
   * Update a query result optimistically.
   */
  const update = useCallback(async <T = unknown>(newData: T): Promise<Context> => {
    return setQueryData((oldData?: Partial<T>) => ({
      ...oldData,
      ...newData,
    }))
  }, [setQueryData])

  /**
   * Replace a query result optimistically.
   */
  const replace = useCallback(async <T = unknown>(newData: T) => {
    return setQueryData(() => newData)
  }, [setQueryData])

  /**
   * Replace a query result optimistically.
   */
  const insert = useCallback(async <T = unknown>(newData: T) => {
    const previousData = queryClient.getQueryData(queryKey)
    const previousDataArray = Array.isArray(previousData) ? previousData : []

    return setQueryData(() => [...previousDataArray, newData])
  }, [queryClient, queryKey, setQueryData])

  /**
   * Revert a query to its previous state.
   */
  const revert = useCallback((
    _err: unknown,
    _variables: unknown,
    context?: Context | void
  ) => {
    if (context?.previousData) {
      queryClient.setQueryData(queryKey, context.previousData)
    }
  }, [queryClient, queryKey])

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
    revert,
    invalidate,
  }
}
