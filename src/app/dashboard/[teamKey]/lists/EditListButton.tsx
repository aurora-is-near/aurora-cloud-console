"use client"

import { Cog6ToothIcon } from "@heroicons/react/20/solid"
import { Button } from "@/components/Button"
import { useModals } from "@/hooks/useModals"

type EditListButtonProps = {
  teamKey: string
  id: number
  disabled?: boolean
}

export const EditListButton = ({
  teamKey,
  id,
  disabled,
}: EditListButtonProps) => {
  const { openModal } = useModals()

  const onClick = async () => {
    openModal("EditList", { teamKey, id })
  }

  return (
    <Button disabled={disabled} onClick={onClick}>
      <Cog6ToothIcon className="w-5 h-5" />
      Edit
    </Button>
  )
}
