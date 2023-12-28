import { apiClient } from "@/utils/api/client"
import { getQueryKey } from "@/utils/api/query-keys"
import { useQuery, useQueryClient } from "@tanstack/react-query"

export const useDeals = () => {
  const queryClient = useQueryClient()
  const { data, isInitialLoading } = useQuery({
    queryFn: apiClient.getDeals,
    queryKey: getQueryKey("getDeals"),
    onSuccess: async ({ deals }) => {
      deals.forEach((deal) => {
        queryClient.setQueryData(getQueryKey("getDeal", { id: deal.id }), deal)
      })
    },
  })

  return {
    data,
    isInitialLoading,
  }
}
