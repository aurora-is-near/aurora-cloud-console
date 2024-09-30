"use client"

import { useRouter } from "next/navigation"
import { deleteDeal } from "@/actions/deals/delete-deal"
import { DeleteButton } from "@/components/DeleteButton"
import { Deal } from "@/types/types"

type DeleteDealButtonProps = {
  teamKey: string
  deal: Deal
}

export const DeleteDealButton = ({ teamKey, deal }: DeleteDealButtonProps) => {
  const router = useRouter()

  const onConfirmClick = async () => {
    await deleteDeal(deal.id)
    router.push(`/legacy_dashboard/${teamKey}/admin/deals`)
  }

  return (
    <DeleteButton
      title="Delete deal"
      description={`Are you sure you want to delete the deal "${deal.name}"?`}
      onDelete={onConfirmClick}
    />
  )
}
