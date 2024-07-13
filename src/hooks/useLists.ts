import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { getQueryKey } from "@/utils/api/query-keys"

export const useLists = () => {
  const queryClient = useQueryClient()
  const query = useQuery(getQueryFnAndKey("getLists"))

  useEffect(() => {
    if (!query.data) {
      return
    }

    query.data.items.forEach((list) => {
      const queryKey = getQueryKey("getList", { id: list.id })

      queryClient.setQueryData(queryKey, list)
    })
  }, [query.data, queryClient])

  return query
}
