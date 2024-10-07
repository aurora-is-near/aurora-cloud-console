"use client"

import { useMemo } from "react"
import { useRouter } from "next/navigation"
import { useModals } from "@/hooks/useModals"
import { API_KEY_SCOPES } from "@/constants/scopes"
import { ApiKey, PublicApiScope } from "@/types/types"
import { updateApiKey } from "@/actions/api-keys/update-api-key"
import AddOrEditApiKeyModal from "./AddOrEditApiKeyModal"

type EditApiKeyModalProps = {
  apiKeys: ApiKey[]
  id: number
}

const EditApiKeyModal = ({ apiKeys, id }: EditApiKeyModalProps) => {
  const { activeModal, closeModal } = useModals()
  const isOpen = activeModal === "EditApiKey"
  const apiKey = apiKeys.find((key) => key.id === id)
  const router = useRouter()

  const onSubmit = async (data: { note: string; scopes: PublicApiScope[] }) => {
    if (!id) {
      throw new Error("No API key ID  provided")
    }

    await updateApiKey(id, data)
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
