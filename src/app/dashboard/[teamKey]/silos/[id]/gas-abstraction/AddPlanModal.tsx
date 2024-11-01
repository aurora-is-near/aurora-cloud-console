"use client"

import { usePathname, useRouter } from "next/navigation"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { Team } from "@/types/types"
import { createDeal } from "@/actions/deals/create-deal"
import { AddOrEditPlanModal } from "./AddOrEditPlanModal"

type AddPlanModalProps = {
  team: Team
}

const AddPlanModal = ({ team }: AddPlanModalProps) => {
  const { activeModal, closeModal } = useModals()
  const router = useRouter()
  const pathname = usePathname()

  const onSubmit = async (data: { name: string }) => {
    const newDeal = await createDeal({
      team_id: team.id,
      ...data,
    })

    // Append the deal ID to the current path to navigate to the new deal page.
    const newPath = `${pathname}/${newDeal.id}`

    closeModal()
    router.push(newPath)

    // Refreshing is necessary to have the list of deals in the sidebar update.
  }

  return (
    <AddOrEditPlanModal
      open={activeModal === Modals.AddPlan}
      onSubmit={onSubmit}
    />
  )
}

export default AddPlanModal
