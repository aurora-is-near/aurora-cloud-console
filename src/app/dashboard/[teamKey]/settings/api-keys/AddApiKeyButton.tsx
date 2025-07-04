"use client"

import { PlusIcon } from "@heroicons/react/20/solid"
import { Button } from "@/components/Button"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"

const AddApiKeyButton = () => {
  const { openModal } = useModals()

  return (
    <Button onClick={() => openModal(Modals.AddApiKey)}>
      <PlusIcon className="w-5 h-5" />
      Create API Key
    </Button>
  )
}

export default AddApiKeyButton
