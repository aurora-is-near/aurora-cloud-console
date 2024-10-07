"use client"

import { ArrowUpTrayIcon } from "@heroicons/react/20/solid"
import { Button } from "@/components/Button"
import { useModals } from "@/hooks/useModals"

type ImportListItemsButtonProps = {
  teamKey: string
  id: number
  disabled?: boolean
}

export const ImportListItemsButton = ({
  teamKey,
  id,
  disabled,
}: ImportListItemsButtonProps) => {
  const { openModal } = useModals()

  const onClick = async () => {
    openModal("ImportListItems", { teamKey, id })
  }

  return (
    <Button disabled={disabled} onClick={onClick}>
      <ArrowUpTrayIcon className="w-5 h-5" />
      Import
    </Button>
  )
}
