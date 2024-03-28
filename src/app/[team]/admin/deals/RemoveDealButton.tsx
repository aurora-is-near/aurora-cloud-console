"use client"

import { deleteDeal } from "@/actions/deals/delete-deal"
import { TableDeleteButton } from "@/components/TableDeleteButton"
import { Deal } from "@/types/types"

type RemoveTokenButtonProps = {
  deal: Deal
}

export const RemoveDealButton = async ({ deal }: RemoveTokenButtonProps) => {
  const onDelete = async () => deleteDeal(deal.id)

  return (
    <TableDeleteButton
      title="Remove deal"
      description={`Are you sure you want to delete the deal "${deal.name}"?`}
      onDelete={onDelete}
    />
  )
}
