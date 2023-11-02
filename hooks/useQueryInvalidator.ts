import { useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"
import { getQueryKey } from "../utils/api/query-keys"
import { apiClient } from "../utils/api/client"

export const useQueryInvalidator = () => {
  const queryClient = useQueryClient()

  const invalidate = useCallback(
    (queryKey: keyof typeof apiClient) => {
      queryClient.invalidateQueries({ queryKey: getQueryKey(queryKey) })
    },
    [queryClient],
  )

  return invalidate
}
