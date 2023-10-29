import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./client";
import { getQueryKey } from "./query-keys";

type ApiClientFunction<TData> = () => Promise<TData>;

export const useApiQuery = <TData>(
  apiFunction: ApiClientFunction<TData>,
) => {
  const functionName = Object.keys(apiClient).find(
    (key) => apiClient[key as keyof typeof apiClient] === apiFunction
  ) as keyof typeof apiClient;

  return useQuery<TData>({
    queryKey: getQueryKey(functionName),
    queryFn: apiFunction,
  });
};

export const useCurrentUser = () => useApiQuery(apiClient.getCurrentUser);
export const useApiKeys = () => useApiQuery(apiClient.getApiKeys);
export const useSilos = () => useApiQuery(apiClient.getSilos);
export const useDeals = () => useApiQuery(apiClient.getDeals);
export const useLists = () => useApiQuery(apiClient.getLists);
