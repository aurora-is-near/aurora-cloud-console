"use client"

import Button from "@/components/Button"
import { Modals, useModals } from "@/hooks/useModals"
import { PlusIcon } from "@heroicons/react/20/solid"

const AddListButton = () => {
  const { openModal } = useModals()

  return (
    <Button onClick={() => openModal(Modals.AddList)}>
      <PlusIcon className="w-5 h-5" />
      Add list
    </Button>
  )
}

export default AddListButton
