import { QueryKey, UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";
import { apiClient } from "./client";
import { getQueryKey } from "./query-keys";

export const useApiListQuery = <
  K extends keyof typeof apiClient,
  TQueryFnData = Awaited<ReturnType<typeof apiClient[K]>>,
  TError = unknown,
  TData extends TQueryFnData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  functionName: K,
): UseQueryResult<TQueryFnData, TError> => {
  const queryKey: TQueryKey = getQueryKey(functionName);

  return useQuery<TQueryFnData, TError, TData, TQueryKey>({
    queryKey,
    queryFn: apiClient[functionName],
  } as UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>);
};

export const useApiQuery = <
  K extends keyof typeof apiClient,
  TQueryFnData = Awaited<ReturnType<typeof apiClient[K]>>,
  TError = unknown,
  TData extends TQueryFnData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  functionName: K,
  id?: number,
) => {
  const queryKey: TQueryKey = getQueryKey(functionName, id);

  return useQuery<TQueryFnData, TError, TData, TQueryKey>({
    queryKey,
    queryFn: () => apiClient[functionName]({ id }),
    enabled: typeof id !== "undefined",
  } as UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>);
};

export const useCurrentUser = () => useApiListQuery('getCurrentUser');
export const useApiKeys = () => useApiListQuery('getApiKeys');
export const useApiKey = (id?: number) => useApiQuery('getApiKey', id);
export const useSilos = () => useApiListQuery('getSilos');
export const useDeals = () => useApiListQuery('getDeals');
export const useUsers = () => useApiListQuery('getUsers');
