"use client"

import { PlusIcon } from "@heroicons/react/20/solid"
import { Button } from "@/components/Button"
import { useModals } from "@/hooks/useModals"

type AddApiKeyButtonProps = {
  teamKey: string
}

const AddApiKeyButton = ({ teamKey }: AddApiKeyButtonProps) => {
  const { openModal } = useModals()

  const onClick = () => {
    openModal("AddApiKey", { teamKey })
  }

  return (
    <Button onClick={onClick}>
      <PlusIcon className="w-5 h-5" />
      Create API Key
    </Button>
  )
}

export default AddApiKeyButton
