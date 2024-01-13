"use client"

import { Modals, useModals } from "@/hooks/useModals"
import { useMutation } from "@tanstack/react-query"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import AddOrEditApiKeyModal from "./AddOrEditApiKeyModal"
import { ApiKeyScope } from "@prisma/client"

const AddApiKeyModal = () => {
  const { activeModal, closeModal } = useModals()
  const getApiKeysUpdater = useOptimisticUpdater("getApiKeys")

  const { mutate: createApiKey } = useMutation({
    mutationFn: apiClient.createApiKey,
    onSuccess: (data) => {
      closeModal()
      getApiKeysUpdater.insert(data)
    },
    onSettled: getApiKeysUpdater.invalidate,
  })

  const onSubmit = async (data: { note: string; scopes: ApiKeyScope[] }) => {
    createApiKey(data)
  }

  return (
    <AddOrEditApiKeyModal
      open={activeModal === Modals.AddApiKey}
      onSubmit={onSubmit}
    />
  )
}

export default AddApiKeyModal
