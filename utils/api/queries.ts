import { QueryKey, UseQueryOptions, UseQueryResult, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./client";
import { getQueryKey } from "./query-keys";

type Options<K extends keyof typeof apiClient> = {
  isSingle?: boolean,
  id?: number,
  relatedFunctionName?: K,
}

export const useApiQuery = <
  K extends keyof typeof apiClient,
  TQueryFnData = Awaited<ReturnType<typeof apiClient[K]>>,
  TError = unknown,
  TData extends TQueryFnData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  functionName: K,
  { isSingle, id, relatedFunctionName }: Options<K> = {},
): UseQueryResult<TQueryFnData, TError> => {
  const queryKey: TQueryKey = getQueryKey(functionName, id);
  const queryClient = useQueryClient();
  const enabled = !isSingle || typeof id !== "undefined";

  const queryFn = isSingle
  ? () => apiClient[functionName]({ id })
  : apiClient[functionName]

  const onSuccess = async (data: TQueryFnData) => {
    if (!relatedFunctionName || !Array.isArray(data)) {
      return
    }

    // Update the query cache for any related items.
    data.forEach((item) => {
      if (typeof item !== "object" || !item.id)  {
        return
      }

      queryClient.setQueryData(
        getQueryKey(relatedFunctionName, item.id),
        item,
      )
    })
  };

  return useQuery<TQueryFnData, TError, TData, TQueryKey>({
    queryKey,
    queryFn,
    enabled,
    onSuccess,
  } as UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>);
};

export const useCurrentUser = () => useApiQuery('getCurrentUser')

export const useApiKeys = () => useApiQuery('getApiKeys', {
  relatedFunctionName: 'getApiKey',
})

export const useApiKey = (id?: number) => useApiQuery('getApiKey', {
  id,
  isSingle: true,
})

export const useSilos = () => useApiQuery('getSilos')

export const useDeals = () => useApiQuery('getDeals')

export const useUsers = () => useApiQuery('getUsers')
