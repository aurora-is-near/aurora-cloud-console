import { DealTransactionCharts } from "@/types/types"
import { useApiQuery } from "@/utils/api/queries"
import { getQueryKey } from "@/utils/api/query-keys"
import { useQueryClient } from "@tanstack/react-query"

export const useDealsTransactions = (params: { interval: string | null }) => {
  const queryClient = useQueryClient()

  return useApiQuery("getDealsTransactions", {
    params,
    onSuccess: async (data) => {
      data.items.forEach((item) => {
        const queryKey = getQueryKey("getDealTransactions", {
          id: item.dealId,
          interval: params.interval,
        })

        const dealTransactions: DealTransactionCharts = { items: [item] }

        queryClient.setQueryData(queryKey, dealTransactions)
      })
    },
  })
}
