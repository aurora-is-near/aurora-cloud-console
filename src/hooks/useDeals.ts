import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { getQueryKey } from "@/utils/api/query-keys"

export const useDeals = () => {
  const queryClient = useQueryClient()
  const query = useQuery(getQueryFnAndKey("getDeals"))

  useEffect(() => {
    if (!query.data) {
      return
    }

    query.data.items.forEach((deal) => {
      const queryKey = getQueryKey("getDeal", { id: deal.id })

      queryClient.setQueryData(queryKey, deal)
    })
  }, [query.data, queryClient])

  return query
}
