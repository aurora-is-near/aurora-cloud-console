import { apiClient } from "@/utils/api/client"
import { getQueryKey } from "@/utils/api/query-keys"
import { useQuery, useQueryClient } from "@tanstack/react-query"

export const useApiKeys = () => {
  const queryClient = useQueryClient()
  const { data, isInitialLoading } = useQuery({
    queryFn: apiClient.getApiKeys,
    queryKey: getQueryKey("getApiKeys"),
    onSuccess: async (apiKeys) => {
      apiKeys.forEach((apiKey) => {
        queryClient.setQueryData(
          getQueryKey("getApiKey", { id: apiKey.id }),
          apiKey,
        )
      })
    },
  })

  return {
    data,
    isInitialLoading,
  }
}
