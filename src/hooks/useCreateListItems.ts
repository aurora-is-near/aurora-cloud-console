import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { apiClient } from "@/utils/api/client"
import { useMutation } from "@tanstack/react-query"

export const useCreateListItems = (
  id: number,
  {
    onSuccess,
    onSettled,
  }: {
    onSuccess?: () => void
    onSettled?: () => void
  } = {},
) => {
  const getListItemsUpdater = useOptimisticUpdater("getListItems", {
    id,
  })

  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.createListItems,
    onSuccess,
    onSettled: () => {
      getListItemsUpdater.invalidate()
      onSettled?.()
    },
  })

  const createListItems = (items: string[]) => {
    mutate({ id, items })
  }

  return { createListItems, isPending }
}
