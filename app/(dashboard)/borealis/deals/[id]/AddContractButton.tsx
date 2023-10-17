"use client"

import Button from "@/components/Button"
import { Modals, useModals } from "@/hooks/useModals"
import { PlusIcon } from "@heroicons/react/20/solid"

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
