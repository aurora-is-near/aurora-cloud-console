import { useApiQuery } from "@/utils/api/queries"
import { getQueryKey } from "@/utils/api/query-keys"

export const useSilos = () => {
  return useApiQuery("getSilos", {
    onSuccess: async (queryClient, data) => {
      data.forEach((silo) => {
        const queryKey = getQueryKey("getSilo", { id: silo.id })

        queryClient.setQueryData(queryKey, silo)
      })
    },
  })
}
