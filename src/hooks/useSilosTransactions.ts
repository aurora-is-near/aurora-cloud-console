import { getQueryFnAndKey } from "@/utils/api/queries"
import { getQueryKey } from "@/utils/api/query-keys"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"

export const useSilosTransactions = ({
  interval,
}: {
  interval: string | null
}) => {
  const queryClient = useQueryClient()
  const query = useQuery(
    getQueryFnAndKey("getSilosTransactions", {
      interval: interval ?? undefined,
    }),
  )

  useEffect(() => {
    if (!query.data) {
      return
    }

    query.data.items.forEach((item) => {
      const queryKey = getQueryKey("getSiloTransactions", {
        id: item.siloId,
        interval: interval ?? undefined,
      })

      const siloTransactions = { items: [item] }

      queryClient.setQueryData(queryKey, siloTransactions)
    })
  }, [interval, query.data, queryClient])

  return query
}
