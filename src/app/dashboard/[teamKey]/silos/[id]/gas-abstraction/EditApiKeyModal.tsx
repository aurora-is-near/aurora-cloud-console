"use client"

import { useRouter } from "next/navigation"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { Deal } from "@/types/types"
import { updateDeal } from "@/actions/deals/update-deal"
import { AddOrEditPlanModal } from "./AddOrEditPlanModal"

type EditPlanModalProps = {
  deal: Deal
}

const EditPlanModal = ({ deal }: EditPlanModalProps) => {
  const { activeModal, closeModal } = useModals()
  const isOpen = activeModal === Modals.EditPlan
  const router = useRouter()

  const onSubmit = async (data: { name: string }) => {
    await updateDeal(deal.id, data)
    closeModal()
    router.refresh()
  }

  return (
    <AddOrEditPlanModal
      open={isOpen}
      values={{ name: deal.name }}
      onSubmit={onSubmit}
    />
  )
}

export default EditPlanModal
