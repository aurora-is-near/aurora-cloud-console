"use client"

import { useRouter } from "next/navigation"
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

  const onSubmit = async (data: { name: string }) => {
    await createDeal({
      team_id: team.id,
      ...data,
    })
    closeModal()
    router.refresh()
  }

  return (
    <AddOrEditPlanModal
      open={activeModal === Modals.AddPlan}
      onSubmit={onSubmit}
    />
  )
}

export default AddPlanModal
