import {
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { apiClient } from "./client"
import { getQueryKey } from "./query-keys"

type Options = {
  enabled?: boolean
  id?: number
  relatedFunctionName?: keyof typeof apiClient
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
  { enabled, relatedFunctionName, params }: Options = {},
): UseQueryResult<TQueryFnData, TError> => {
  const queryKey: TQueryKey = getQueryKey(functionName, params)
  const queryClient = useQueryClient()

  const queryFn = () => apiClient[functionName](params)

  const onSuccess = async (data: TQueryFnData) => {
    if (!relatedFunctionName || !Array.isArray(data)) {
      return
    }

    // Update the query cache for any related items.
    data.forEach((item) => {
      if (typeof item !== "object" || !item.id) {
        return
      }

      queryClient.setQueryData(getQueryKey(relatedFunctionName, item.id), item)
    })
  }

  return useQuery<TQueryFnData, TError, TData, TQueryKey>({
    queryKey,
    queryFn,
    enabled,
    onSuccess,
  } as UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>)
}

export const useCurrentUser = () => useApiQuery("getCurrentUser")

export const useApiKeys = () =>
  useApiQuery("getApiKeys", {
    relatedFunctionName: "getApiKey",
  })

export const useApiKey = (id?: number) =>
  useApiQuery("getApiKey", {
    params: { id },
    enabled: typeof id !== "undefined",
  })

export const useSilo = (slug: string) =>
  useApiQuery("getSilo", {
    params: { slug },
  })

export const useSilos = () => useApiQuery("getSilos")

export const useDeals = () => useApiQuery("getDeals")

export const useUsers = (params?: {
  limit?: number
  offset?: number
  dealId?: string
}) => useApiQuery("getUsers", { params })

export const useUserDeals = () => useApiQuery("getUserDeals")

export const useUsersExport = (params?: { dealId?: string }) =>
  useApiQuery("getUsersExport", { params })

export const useTransactions = (params?: { interval: string | null }) =>
  useApiQuery("getTransactions", { params })

export const useSiloTransactions = (slug: string) =>
  useApiQuery("getSiloTransactions", {
    params: { slug },
  })
