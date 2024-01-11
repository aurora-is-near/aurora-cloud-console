import { useApiQuery } from "@/utils/api/queries"
import { getQueryKey } from "@/utils/api/query-keys"
import { useQueryClient } from "@tanstack/react-query"

export const useApiKeys = () => {
  const queryClient = useQueryClient()

  return useApiQuery("getApiKeys", {
    onSuccess: async (data) => {
      data.forEach((apiKey) => {
        const queryKey = getQueryKey("getApiKey", { id: apiKey.id })

        queryClient.setQueryData(queryKey, apiKey)
      })
    },
  })
}
