"use client"

import Button from "@/components/Button"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { PlusIcon } from "@heroicons/react/20/solid"

export const AddListButton = () => {
  const { openModal } = useModals()

  return (
    <Button onClick={() => openModal(Modals.AddList)}>
      <PlusIcon className="w-5 h-5" />
      Add list
    </Button>
  )
}
