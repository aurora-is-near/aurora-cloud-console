import { useApiQuery } from "@/utils/api/queries"
import { getQueryKey } from "@/utils/api/query-keys"
import { useQueryClient } from "@tanstack/react-query"

export const useDeals = () => {
  const queryClient = useQueryClient()

  return useApiQuery("getDeals", {
    onSuccess: async (data) => {
      data.deals.forEach((deal) => {
        const queryKey = getQueryKey("getDeal", { id: deal.id })

        queryClient.setQueryData(queryKey, deal)
      })
    },
  })
}
