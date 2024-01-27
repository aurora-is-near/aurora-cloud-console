"use client"

import Button from "@/components/Button"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { Cog6ToothIcon } from "@heroicons/react/20/solid"
import { useQueryState } from "next-usequerystate"

type EditListButtonProps = {
  id: number
}

export const EditListButton = ({ id }: EditListButtonProps) => {
  const { openModal } = useModals()
  const [, setId] = useQueryState("id")

  const onClick = () => {
    setId(String(id))
    openModal(Modals.EditList)
  }

  return (
    <Button onClick={onClick}>
      <Cog6ToothIcon className="w-5 h-5" />
      Manage
    </Button>
  )
}
