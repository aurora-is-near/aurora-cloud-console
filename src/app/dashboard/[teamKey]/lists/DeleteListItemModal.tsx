"use client"

import { useMutation } from "@tanstack/react-query"
import { DeleteModal } from "@/components/DeleteModal"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { useModals } from "@/hooks/useModals"

type DeleteListItemModalProps = {
  id: number
  item: string
}

export const DeleteListItemModal = ({ id, item }: DeleteListItemModalProps) => {
  const { activeModal, closeModal } = useModals()
  const getListItemsUpdater = useOptimisticUpdater("getListItems")

  const { mutate: deleteListItem, isPending } = useMutation({
    mutationFn: apiClient.deleteListItem,
    onSettled: getListItemsUpdater.invalidate,
  })

  const onDeleteClick = async () => {
    deleteListItem(
      { id, item: encodeURIComponent(item) },
      { onSettled: closeModal },
    )
  }

  return (
    <DeleteModal
      title="Delete list item"
      description="You are about to delete an item from the list. This item will also be removed from any associated deals. Are you sure you want to proceed?"
      isOpen={activeModal === "DeleteListItem"}
      onClose={closeModal}
      onDeleteClick={onDeleteClick}
      isPending={isPending}
    />
  )
}
