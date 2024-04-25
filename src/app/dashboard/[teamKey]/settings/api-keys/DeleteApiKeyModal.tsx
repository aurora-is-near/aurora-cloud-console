"use client"

import { useQueryState } from "next-usequerystate"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { DeleteModal } from "@/components/DeleteModal"
import { deleteApiKey } from "@/actions/api-keys/delete-api-key"
import { useState } from "react"
import { useRouter } from "next/navigation"

export const DeleteApiKeyModal = () => {
  const [isPending, setIsPending] = useState(false)
  const { activeModal, closeModal } = useModals()
  const [id, setId] = useQueryState("id")
  const router = useRouter()

  const onClose = () => {
    setId(null)
    closeModal()
  }

  const onDeleteClick = async () => {
    setIsPending(true)
    await deleteApiKey(Number(id))
    setIsPending(false)
    onClose()
    router.refresh()
  }

  return (
    <DeleteModal
      title="Delete list"
      description="You are about to delete this API key. Are you sure you want to proceed?"
      isOpen={activeModal === Modals.DeleteApiKey}
      onClose={onClose}
      onDeleteClick={onDeleteClick}
      isPending={isPending}
    />
  )
}
