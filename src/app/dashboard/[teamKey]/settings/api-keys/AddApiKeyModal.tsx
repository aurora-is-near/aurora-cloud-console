"use client"

import { useRouter } from "next/navigation"
import { useModals } from "@/hooks/useModals"
import { PublicApiScope } from "@/types/types"
import { createApiKey } from "@/actions/api-keys/create-api-key"
import AddOrEditApiKeyModal from "./AddOrEditApiKeyModal"

type AddApiKeyModalProps = {
  teamKey: string
}

const AddApiKeyModal = ({ teamKey }: AddApiKeyModalProps) => {
  const { activeModal, closeModal } = useModals()
  const router = useRouter()

  const onSubmit = async (data: { note: string; scopes: PublicApiScope[] }) => {
    await createApiKey(teamKey, data)
    closeModal()
    router.refresh()
  }

  return (
    <AddOrEditApiKeyModal
      open={activeModal === "AddApiKey"}
      onSubmit={onSubmit}
    />
  )
}

export default AddApiKeyModal
