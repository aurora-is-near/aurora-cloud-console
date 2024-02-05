"use client"

import { useQueryState } from "next-usequerystate"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { DeleteModal } from "@/components/DeleteModal"
import { useMutation } from "@tanstack/react-query"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"

export const DeleteListItemModal = () => {
  const { activeModal, closeModal } = useModals()
  const [id] = useQueryState("id")
  const [item, setItem] = useQueryState("item")

  const onClose = () => {
    setItem(null)
    closeModal()
  }

  const getListItemsUpdater = useOptimisticUpdater("getListItems")

  const { mutate: deleteListItem, isPending } = useMutation({
    mutationFn: apiClient.deleteListItem,
    onSettled: getListItemsUpdater.invalidate,
  })

  const onDeleteClick = async () => {
    if (!id) {
      throw new Error("An ID is required to delete the list item")
    }

    if (!item) {
      throw new Error("No item was provided for deletion")
    }

    deleteListItem(
      { id: Number(id), item: encodeURIComponent(item) },
      { onSettled: closeModal },
    )
  }

  return (
    <DeleteModal
      title="Delete list item"
      description="You are about to delete an item from the list. This item will also be removed from any associated deals. Are you sure you want to proceed?"
      isOpen={activeModal === Modals.DeleteListItem}
      onClose={onClose}
      onDeleteClick={onDeleteClick}
      isPending={isPending}
    />
  )
}
