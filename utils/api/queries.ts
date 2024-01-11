import {
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query"
import { ApiClient, apiClient } from "./client"
import { getQueryKey } from "./query-keys"

type Options<
  K extends keyof ApiClient,
  TQueryFnData = Awaited<ReturnType<ApiClient[K]>>,
  TError = unknown,
  TData extends TQueryFnData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> & {
  enabled?: boolean
  id?: number
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
  {
    params,
    ...restOptions
  }: Options<K, TQueryFnData, TError, TData, TQueryKey> = {},
): UseQueryResult<TQueryFnData, TError> => {
  const queryKey: TQueryKey = getQueryKey(functionName, params)
  const queryFn = () => apiClient[functionName](params as any)

  return useQuery<TQueryFnData, TError, TData, TQueryKey>({
    ...restOptions,
    queryKey,
    queryFn,
  } as UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>)
}
