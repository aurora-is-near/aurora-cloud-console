import { QueryKey } from "@tanstack/react-query"
import { ApiClient, apiClient } from "./client"
import { getQueryKey } from "./query-keys"

export const getQueryFnAndKey = <
  K extends keyof ApiClient,
  TQueryFnData = Awaited<ReturnType<ApiClient[K]>>,
  TQueryKey extends QueryKey = QueryKey,
>(
  functionName: K,
  params?: Parameters<ApiClient[K]>[0],
): {
  queryFn: () => Promise<TQueryFnData>
  queryKey: TQueryKey
} => {
  const queryKey: TQueryKey = getQueryKey(functionName, params)
  const queryFn = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await apiClient[functionName](params as any)

    return data as TQueryFnData
  }

  return { queryFn, queryKey }
}
