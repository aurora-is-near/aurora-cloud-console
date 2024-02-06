"use client"

import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { RateLimit } from "@/types/types"
import { useMutation } from "@tanstack/react-query"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { RateLimitsModal } from "./RateLimitsModal"

export const UserRateLimitsModal = () => {
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

  const onSubmit = async (data: { limits: RateLimit[] }) => {
    createApiKey(data)
  }

  return (
    <RateLimitsModal
      open={activeModal === Modals.UserRateLimitsModal}
      onSubmit={onSubmit}
      variant="user"
    />
  )
}
