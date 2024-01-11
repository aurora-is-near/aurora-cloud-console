import {
  QueryClient,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { apiClient } from "./client"
import { getQueryKey } from "./query-keys"

type Options<TQueryFnData> = {
  enabled?: boolean
  id?: number
  onSuccess?: (queryClient: QueryClient, data: TQueryFnData) => void
  params?: any
}

export const useApiQuery = <
  K extends keyof typeof apiClient,
  TQueryFnData = Awaited<ReturnType<(typeof apiClient)[K]>>,
  TError = unknown,
  TData extends TQueryFnData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  functionName: K,
  { enabled, onSuccess, params }: Options<TQueryFnData> = {},
): UseQueryResult<TQueryFnData, TError> => {
  const queryKey: TQueryKey = getQueryKey(functionName, params)
  const queryClient = useQueryClient()

  const queryFn = () => apiClient[functionName](params)

  const handleSuccess = async (data: TQueryFnData) => {
    if (onSuccess) {
      onSuccess(queryClient, data)
    }
  }

  return useQuery<TQueryFnData | undefined, TError, TData, TQueryKey>({
    queryKey,
    queryFn,
    enabled,
    onSuccess: handleSuccess,
  } as UseQueryOptions<TQueryFnData | undefined, TError, TData, TQueryKey>)
}
