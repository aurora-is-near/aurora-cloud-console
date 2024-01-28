"use client"

import { useQueryState } from "next-usequerystate"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { DeleteModal } from "@/components/DeleteModal"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { useMutation } from "@tanstack/react-query"
import { apiClient } from "@/utils/api/client"

export const DeleteApiKeyModal = () => {
  const { activeModal, closeModal } = useModals()
  const [id, setId] = useQueryState("id")

  const onClose = () => {
    setId(null)
    closeModal()
  }

  const getApiKeysUpdater = useOptimisticUpdater("getApiKeys")

  const { mutate: deleteApiKey, isPending } = useMutation({
    mutationFn: apiClient.deleteApiKey,
    onSettled: getApiKeysUpdater.invalidate,
  })

  const onDeleteClick = async () => {
    if (!id) {
      throw new Error("An ID is required to delete the api key")
    }

    deleteApiKey(
      { id: Number(id) },
      {
        onSettled: closeModal,
      },
    )
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
