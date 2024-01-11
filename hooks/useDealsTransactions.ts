import { DealTransactionCharts } from "@/types/types"
import { useApiQuery } from "@/utils/api/queries"
import { getQueryKey } from "@/utils/api/query-keys"

export const useDealsTransactions = (params: { interval: string | null }) => {
  return useApiQuery("getDealsTransactions", {
    params,
    onSuccess: async (queryClient, data) => {
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
