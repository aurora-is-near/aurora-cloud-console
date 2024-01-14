import { getQueryFnAndKey } from "@/utils/api/queries"
import { getQueryKey } from "@/utils/api/query-keys"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"

export const useApiKeys = () => {
  const queryClient = useQueryClient()
  const query = useQuery(getQueryFnAndKey("getApiKeys"))

  useEffect(() => {
    if (!query.data) {
      return
    }

    query.data.forEach((apiKey) => {
      const queryKey = getQueryKey("getApiKey", { id: apiKey.id })

      queryClient.setQueryData(queryKey, apiKey)
    })
  }, [query.data, queryClient])

  return query
}
