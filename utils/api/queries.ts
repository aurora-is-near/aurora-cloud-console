import {
  QueryClient,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { ApiClient, apiClient } from "./client"
import { getQueryKey } from "./query-keys"

type Options<TQueryFnData, K extends keyof ApiClient> = {
  enabled?: boolean
  id?: number
  onSuccess?: (queryClient: QueryClient, data: TQueryFnData) => void
  params?: Parameters<ApiClient[K]>[0]
}

export const useApiQuery = <
  K extends keyof ApiClient,
  TQueryFnData = Awaited<ReturnType<ApiClient[K]>>,
  TError = unknown,
  TData extends TQueryFnData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  functionName: K,
  { enabled, onSuccess, params }: Options<TQueryFnData, K> = {},
): UseQueryResult<TQueryFnData, TError> => {
  const queryKey: TQueryKey = getQueryKey(functionName, params)
  const queryClient = useQueryClient()

  const queryFn = () => apiClient[functionName](params as any)

  const handleSuccess = async (data: TQueryFnData) => {
    if (onSuccess) {
      onSuccess(queryClient, data)
    }
  }

  return useQuery<TQueryFnData, TError, TData, TQueryKey>({
    queryKey,
    queryFn,
    enabled,
    onSuccess: handleSuccess,
  } as UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>)
}
