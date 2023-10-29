import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { getQueryKey } from "../utils/api/query-keys";
import { apiClient } from "../utils/api/client";

export const useOptimisticUpdater = (queryKey: keyof typeof apiClient) => {
  const queryClient = useQueryClient();

  const update = useCallback(<T = unknown>(newData: T) => {
    queryClient.setQueryData(getQueryKey(queryKey), (oldData?: Partial<T>) => ({
      ...oldData,
      ...newData,
    }))
  }, [queryClient, queryKey])

  const replace = useCallback(<T = unknown>(newData: T) => {
    queryClient.setQueryData(getQueryKey(queryKey), newData)
  }, [queryClient, queryKey])

  return { update, replace }
}
