"use client"

import { Button } from "@/components/Button"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { ArrowUpTrayIcon } from "@heroicons/react/20/solid"
import { useQueryState } from "next-usequerystate"

type ImportListItemsButtonProps = {
  id: number
}

export const ImportListItemsButton = ({ id }: ImportListItemsButtonProps) => {
  const { openModal } = useModals()
  const [, setId] = useQueryState("id")

  const onClick = () => {
    setId(String(id))
    openModal(Modals.ImportListItems)
  }

  return (
    <Button onClick={onClick}>
      <ArrowUpTrayIcon className="w-5 h-5" />
      Import
    </Button>
  )
}
