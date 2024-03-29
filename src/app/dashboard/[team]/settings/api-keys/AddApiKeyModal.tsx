"use client"

import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { PublicApiScope } from "@/types/types"
import AddOrEditApiKeyModal from "./AddOrEditApiKeyModal"
import { createApiKey } from "@/actions/api-keys/create-api-key"
import { useRouter } from "next/navigation"

const AddApiKeyModal = () => {
  const { activeModal, closeModal } = useModals()
  const router = useRouter()

  const onSubmit = async (data: { note: string; scopes: PublicApiScope[] }) => {
    await createApiKey(data)
    closeModal()
    router.refresh()
  }

  return (
    <AddOrEditApiKeyModal
      open={activeModal === Modals.AddApiKey}
      onSubmit={onSubmit}
    />
  )
}

export default AddApiKeyModal
