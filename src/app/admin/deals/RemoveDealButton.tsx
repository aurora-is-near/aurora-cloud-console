"use client"

import { deleteDeal } from "@/actions/deals/delete-deal"
import TableButton from "@/components/TableButton"
import { Deal } from "@/types/types"
import { TrashIcon } from "@heroicons/react/24/outline"

type RemoveTokenButtonProps = {
  deal: Deal
}

export const RemoveDealButton = async ({ deal }: RemoveTokenButtonProps) => {
  const onClick = () => {
    if (!confirm(`Are you sure you want to delete the deal "${deal.name}"?`)) {
      return
    }

    deleteDeal(deal.id)
    window.location.href = `${window.location.pathname}?operation=deleted`
  }

  return (
    <TableButton
      Icon={TrashIcon}
      srOnlyText={`Remove ${deal.name}`}
      onClick={onClick}
    />
  )
}
