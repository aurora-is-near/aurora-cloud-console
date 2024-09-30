"use client"

import { Cog6ToothIcon } from "@heroicons/react/20/solid"
import { useQueryState } from "next-usequerystate"
import { Button } from "@/components/Button"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"

type EditListButtonProps = {
  id: number
  disabled?: boolean
}

export const EditListButton = ({ id, disabled }: EditListButtonProps) => {
  const { openModal } = useModals()
  const [, setId] = useQueryState("id")

  const onClick = async () => {
    await setId(String(id))
    openModal(Modals.EditList)
  }

  return (
    <Button disabled={disabled} onClick={onClick}>
      <Cog6ToothIcon className="w-5 h-5" />
      Edit
    </Button>
  )
}
