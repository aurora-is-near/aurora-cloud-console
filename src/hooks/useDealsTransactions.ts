import { getQueryFnAndKey } from "@/utils/api/queries"
import { getQueryKey } from "@/utils/api/query-keys"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"

export const useDealsTransactions = (params: { interval?: string }) => {
  const queryClient = useQueryClient()
  const query = useQuery(getQueryFnAndKey("getDealsTransactions", params))

  useEffect(() => {
    if (!query.data) {
      return
    }

    query.data.items.forEach((item) => {
      const queryKey = getQueryKey("getDealTransactions", {
        id: item.dealId,
        interval: params.interval,
      })

      const dealTransactions = { items: [item] }

      queryClient.setQueryData(queryKey, dealTransactions)
    })
  })

  return query
}
