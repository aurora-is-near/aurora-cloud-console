import { useApiQuery } from "@/utils/api/queries"
import { getQueryKey } from "@/utils/api/query-keys"

export const useApiKeys = () => {
  return useApiQuery("getApiKeys", {
    onSuccess: async (queryClient, data) => {
      data.forEach((apiKey) => {
        const queryKey = getQueryKey("getApiKey", { id: apiKey.id })

        queryClient.setQueryData(queryKey, apiKey)
      })
    },
  })
}
