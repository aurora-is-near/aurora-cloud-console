import { useApiQuery } from "@/utils/api/queries"
import { getQueryKey } from "@/utils/api/query-keys"
import { useQueryClient } from "@tanstack/react-query"

export const useSilos = () => {
  const queryClient = useQueryClient()

  return useApiQuery("getSilos", {
    onSuccess: async (data) => {
      data.forEach((silo) => {
        const queryKey = getQueryKey("getSilo", { id: silo.id })

        queryClient.setQueryData(queryKey, silo)
      })
    },
  })
}
