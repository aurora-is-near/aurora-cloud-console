"use client"

import { deleteUser } from "./actions/delete-user"
import { useQueryState } from "next-usequerystate"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { DeleteModal } from "@/components/DeleteModal"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { useMutation } from "@tanstack/react-query"
import { apiClient } from "@/utils/api/client"

export const DeleteListModal = () => {
  const { activeModal, closeModal } = useModals()
  const [id, setId] = useQueryState("id")

  const onClose = () => {
    setId(null)
    closeModal()
  }

  const getListsUpdater = useOptimisticUpdater("getLists")

  const { mutate: deleteList, isPending } = useMutation({
    mutationFn: apiClient.deleteList,
    onSettled: getListsUpdater.invalidate,
  })

  const onDeleteClick = async () => {
    if (!id) {
      throw new Error("An ID is required to delete the list")
    }

    deleteList({ id: Number(id) }, { onSettled: closeModal })
  }

  return (
    <DeleteModal
      title="Delete list"
      description="You are about to delete this list. It will also be removed from any associated deals. Are you sure you want to proceed?"
      isOpen={activeModal === Modals.DeleteList}
      onClose={onClose}
      onDeleteClick={onDeleteClick}
    />
  )
}
