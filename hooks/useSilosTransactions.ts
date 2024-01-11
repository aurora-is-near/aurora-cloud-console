import { SiloTransactionCharts } from "@/types/types"
import { useApiQuery } from "@/utils/api/queries"
import { getQueryKey } from "@/utils/api/query-keys"

export const useSilosTransactions = (params: { interval: string | null }) => {
  return useApiQuery("getSilosTransactions", {
    params,
    onSuccess: async (queryClient, data) => {
      data.items.forEach((item) => {
        const queryKey = getQueryKey("getSiloTransactions", {
          id: item.siloId,
          interval: params.interval,
        })

        const siloTransactions: SiloTransactionCharts = { items: [item] }

        queryClient.setQueryData(queryKey, siloTransactions)
      })
    },
  })
}
