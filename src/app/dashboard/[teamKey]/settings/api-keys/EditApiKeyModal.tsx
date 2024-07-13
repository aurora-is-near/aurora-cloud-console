"use client"

import { useQueryState } from "next-usequerystate"
import { useMemo } from "react"
import { useRouter } from "next/navigation"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { API_KEY_SCOPES } from "@/constants/scopes"
import { ApiKey, PublicApiScope } from "@/types/types"
import { updateApiKey } from "@/actions/api-keys/update-api-key"
import AddOrEditApiKeyModal from "./AddOrEditApiKeyModal"

type EditApiKeyModalProps = {
  apiKeys: ApiKey[]
}

const EditApiKeyModal = ({ apiKeys }: EditApiKeyModalProps) => {
  const { activeModal, closeModal } = useModals()
  const [id] = useQueryState("id")
  const isOpen = activeModal === Modals.EditApiKey
  const apiKeyId = id ? Number(id) : undefined
  const apiKey = apiKeys.find((apiKey) => apiKey.id === apiKeyId)
  const router = useRouter()

  const onSubmit = async (data: { note: string; scopes: PublicApiScope[] }) => {
    await updateApiKey(Number(id), data)
    closeModal()
    router.refresh()
  }

  const values = useMemo(
    () => ({
      note: apiKey?.note ?? "",
      ...API_KEY_SCOPES.reduce<Partial<Record<PublicApiScope, boolean>>>(
        (acc, scope) => ({
          ...acc,
          [scope]: !!apiKey?.scopes.includes(scope),
        }),
        {},
      ),
    }),
    [apiKey],
  )

  return (
    <AddOrEditApiKeyModal open={isOpen} values={values} onSubmit={onSubmit} />
  )
}

export default EditApiKeyModal
