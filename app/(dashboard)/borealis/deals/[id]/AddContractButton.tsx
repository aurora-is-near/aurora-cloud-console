"use client"

import { PlusIcon } from "@heroicons/react/20/solid"
import Button from "@/components/Button"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"

const AddContractButton = () => {
  const { openModal } = useModals()

  return (
    <Button onClick={() => openModal(Modals.AddContract)}>
      <PlusIcon className="w-5 h-5" />
      Add contract
    </Button>
  )
}

export default AddContractButton
