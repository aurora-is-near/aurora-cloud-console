import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { SiloTransactionCharts } from "@/types/types"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { getQueryKey } from "@/utils/api/query-keys"

export const useSilosTransactions = (params: { interval: string | null }) => {
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

      const siloTransactions: SiloTransactionCharts = { items: [item] }

      queryClient.setQueryData(queryKey, siloTransactions)
    })
  }, [params.interval, query.data, queryClient])

  return query
}
