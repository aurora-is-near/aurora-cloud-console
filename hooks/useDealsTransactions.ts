import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { DealTransactionCharts } from "@/types/types"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { getQueryKey } from "@/utils/api/query-keys"

export const useDealsTransactions = (params: { interval: string | null }) => {
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

      const dealTransactions: DealTransactionCharts = { items: [item] }

      queryClient.setQueryData(queryKey, dealTransactions)
    })
  })

  return query
}
