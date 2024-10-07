"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useModals } from "@/hooks/useModals"
import { DeleteModal } from "@/components/DeleteModal"
import { deleteApiKey } from "@/actions/api-keys/delete-api-key"

type DeleteApiKeyModalProps = {
  id: number
}

export const DeleteApiKeyModal = ({ id }: DeleteApiKeyModalProps) => {
  const [isPending, setIsPending] = useState(false)
  const { activeModal, closeModal } = useModals()
  const router = useRouter()

  const onClose = async () => {
    closeModal()
  }

  const onDeleteClick = async () => {
    setIsPending(true)
    await deleteApiKey(id)
    setIsPending(false)
    await onClose()
    router.refresh()
  }

  return (
    <DeleteModal
      title="Delete list"
      description="You are about to delete this API key. Are you sure you want to proceed?"
      isOpen={activeModal === "DeleteApiKey"}
      onClose={onClose}
      onDeleteClick={onDeleteClick}
      isPending={isPending}
    />
  )
}
