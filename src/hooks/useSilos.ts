import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { getQueryKey } from "@/utils/api/query-keys"

export const useSilos = () => {
  const queryClient = useQueryClient()
  const query = useQuery(getQueryFnAndKey("getSilos"))

  useEffect(() => {
    if (!query.data) {
      return
    }

    query.data.items.forEach((silo) => {
      const queryKey = getQueryKey("getSilo", { id: silo.id })

      queryClient.setQueryData(queryKey, silo)
    })
  }, [query.data, queryClient])

  return query
}
