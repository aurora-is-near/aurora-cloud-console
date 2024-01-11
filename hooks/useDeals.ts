import { useApiQuery } from "@/utils/api/queries"
import { getQueryKey } from "@/utils/api/query-keys"

export const useDeals = () => {
  return useApiQuery("getDeals", {
    onSuccess: async (queryClient, data) => {
      data.deals.forEach((deal) => {
        const queryKey = getQueryKey("getDeal", { id: deal.id })

        queryClient.setQueryData(queryKey, deal)
      })
    },
  })
}
