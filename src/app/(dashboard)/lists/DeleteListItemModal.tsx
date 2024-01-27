"use client"

import { deleteUser } from "./actions/delete-user"
import { useQueryState } from "next-usequerystate"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { DeleteModal } from "@/components/DeleteModal"

export const DeleteListItemModal = () => {
  const { activeModal, closeModal } = useModals()
  const [address, setAddress] = useQueryState("address")

  const onClose = () => {
    setAddress(null)
    closeModal()
  }

  const onDeleteClick = async () => {
    if (!address) return

    await deleteUser(address)
    close()
  }

  return (
    <DeleteModal
      title="Delete list item"
      description="You are about to delete this item from the list. It will also be removed from any associated deals. Are you sure you want to proceed?"
      isOpen={activeModal === Modals.DeleteAddress}
      onClose={onClose}
      onDeleteClick={onDeleteClick}
    />
  )
}
