"use client"

import { Modals, useModals } from "@/hooks/useModals"
import { API_KEY_SCOPES } from "@/constants/scopes"
import { PublicApiScope } from "@/types/types"
import { useMutation } from "@tanstack/react-query"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { useQueryState } from "next-usequerystate"
import { useApiKey } from "@/utils/api/queries"
import { useMemo } from "react"
import AddOrEditApiKeyModal from "./AddOrEditApiKeyModal"

const EditApiKeyModal = () => {
  const { activeModal, closeModal } = useModals()
  const [id, setId] = useQueryState("id")
  const isOpen = activeModal === Modals.EditApiKey
  const { data: apiKey, isInitialLoading } = useApiKey(id ? Number(id) : undefined)

  const getApiKeyUpdater = useOptimisticUpdater('getApiKey')
  const getApiKeysUpdater = useOptimisticUpdater('getApiKeys')

  const { mutate: updateApiKey } = useMutation({
    mutationFn: apiClient.updateApiKey,
    onMutate: getApiKeyUpdater.update,
    onSuccess: closeModal,
    onSettled: () => {
      getApiKeyUpdater.invalidate()
      getApiKeysUpdater.invalidate()
    }
  })

  const onSubmit = async (data: {
    note: string,
    scopes: PublicApiScope[]
  }) => {
    updateApiKey({
      id: Number(id),
      ...data,
    })
  }

  const values = useMemo(() => ({
    note: apiKey?.note ?? "",
    ...API_KEY_SCOPES.reduce<Partial<Record<PublicApiScope, boolean>>>((acc, scope) => ({
      ...acc,
      [scope]: !!apiKey?.scopes.includes(scope)
    }), {})
  }), [apiKey]);

  return (
    <AddOrEditApiKeyModal
      open={isOpen}
      values={values}
      onSubmit={onSubmit}
      afterLeave={() => {
        setId(null)
      }}
    />
  )
}

export default EditApiKeyModal
