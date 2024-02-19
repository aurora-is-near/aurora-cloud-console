import { getQueryFnAndKey } from "@/utils/api/queries"
import { getQueryKey } from "@/utils/api/query-keys"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"

export const useSilosTransactions = (params: { interval?: string }) => {
  const queryClient = useQueryClient()
  const query = useQuery(getQueryFnAndKey("getSilosTransactions", params))

  useEffect(() => {
    if (!query.data) {
      return
    }

    query.data.items.forEach((item) => {
      const queryKey = getQueryKey("getSiloTransactions", {
        id: item.siloId,
        interval: params.interval,
      })

      const siloTransactions = { items: [item] }

      queryClient.setQueryData(queryKey, siloTransactions)
    })
  }, [params.interval, query.data, queryClient])

  return query
}
