import { usePathname, useRouter } from "next/navigation"
import { DeleteButton } from "@/components/DeleteButton"
import { deleteDeal } from "@/actions/deals/delete-deal"

type DeletePlanButtonProps = {
  dealId: number
}

export const DeletePlanButton = ({ dealId }: DeletePlanButtonProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const onConfirmClick = async () => {
    await deleteDeal(dealId)
    router.refresh()

    // Remove the plan ID from the current path to get the parent path
    const newPath = pathname.replace(/\/\d+$/, "")

    router.push(newPath)
  }

  return (
    <DeleteButton
      title="Delete plan"
      description="Are you sure you want to delete this plan?"
      onDelete={onConfirmClick}
    />
  )
}
