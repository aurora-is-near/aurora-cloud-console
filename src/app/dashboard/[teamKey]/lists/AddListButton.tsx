"use client"

import { PlusIcon } from "@heroicons/react/20/solid"
import { Button } from "@/components/Button"
import { useModals } from "@/hooks/useModals"

export const AddListButton = () => {
  const { openModal } = useModals()

  return (
    <Button
      onClick={() => {
        openModal("AddList")
      }}
    >
      <PlusIcon className="w-5 h-5" />
      Add list
    </Button>
  )
}
