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

  return useQuery<TQueryFnData, TError, TData, TQueryKey>({
    queryKey,
    queryFn,
    enabled,
    onSuccess: handleSuccess,
  } as UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>)
}

export const useCurrentUser = () => useApiQuery("getCurrentUser")

export const useApiKeys = () =>
  useApiQuery("getApiKeys", {
    onSuccess: async (queryClient, data) => {
      data.forEach((apiKey) => {
        const queryKey = getQueryKey("getApiKey", { id: apiKey.id })

        queryClient.setQueryData(queryKey, apiKey)
      })
    },
  })

export const useApiKey = (id?: number) =>
  useApiQuery("getApiKey", {
    params: { id },
    enabled: typeof id !== "undefined",
  })

export const useSilo = (params: { id: string }) =>
  useApiQuery("getSilo", {
    params,
  })

export const useSilos = () => useApiQuery("getSilos")

export const useDeal = (params: { id: number }) =>
  useApiQuery("getDeal", { params })

export const useDeals = () =>
  useApiQuery("getDeals", {
    onSuccess: async (queryClient, data) => {
      data.deals.forEach((deal) => {
        const queryKey = getQueryKey("getDeal", { id: deal.id })

        queryClient.setQueryData(queryKey, deal)
      })
    },
  })

export const useDealContracts = (params: { id?: number } = {}) =>
  useApiQuery("getDealContracts", {
    params,
    enabled: typeof params.id !== "undefined",
  })

export const useDealContract = (
  params: { id?: number; contractId?: number } = {},
) =>
  useApiQuery("getDealContract", {
    params,
    enabled: typeof params.id !== "undefined",
  })

export const useUsers = (params?: {
  limit?: number
  offset?: number
  dealId?: number
}) => useApiQuery("getUsers", { params })

export const useUsersExport = (params?: { dealId?: number }) =>
  useApiQuery("getUsersExport", { params })

export const useSilosTransactions = (params?: { interval: string | null }) =>
  useApiQuery("getSilosTransactions", { params })

export const useSiloTransactions = (params: {
  id: string
  interval?: string | null
}) =>
  useApiQuery("getSiloTransactions", {
    params,
  })

export const useDealTransactions = (params: {
  id: string
  interval?: string | null
}) =>
  useApiQuery("getDealTransactions", {
    params,
  })

export const useDealsTransactions = (params: { interval?: string | null }) =>
  useApiQuery("getDealsTransactions", {
    params,
  })

export const useTeam = () => useApiQuery("getTeam")

export const useTeamMembers = () => useApiQuery("getTeamMembers")
