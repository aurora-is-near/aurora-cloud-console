"use client"

import { deleteDeal } from "@/actions/deals/delete-deal"
import { TableDeleteButton } from "@/components/TableDeleteButton"
import { Deal } from "@/types/types"

type DeleteTokenTableButtonProps = {
  deal: Deal
}

export const DeleteDealTableButton = async ({
  deal,
}: DeleteTokenTableButtonProps) => {
  const onDelete = async () => deleteDeal(deal.id)

  return (
    <TableDeleteButton
      title="Delete deal"
      description={`Are you sure you want to delete the deal "${deal.name}"?`}
      onDelete={onDelete}
    />
  )
}
