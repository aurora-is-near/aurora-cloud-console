"use client"

import { usePathname, useRouter } from "next/navigation"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { Team } from "@/types/types"
import { createDeal } from "@/actions/deals/create-deal"
import { AddOrEditPlanModal } from "./AddOrEditPlanModal"

type AddPlanModalProps = {
  team: Team
  siloId: number
}

const AddPlanModal = ({ team, siloId }: AddPlanModalProps) => {
  const { activeModal } = useModals()
  const router = useRouter()
  const pathname = usePathname()

  const onSubmit = async (data: { name: string }) => {
    const newDeal = await createDeal({
      deal: {
        team_id: team.id,
        ...data,
      },
      siloId,
    })

    // Append the deal ID to the current path to navigate to the new deal page.
    router.push(`${pathname}/${newDeal?.id}`)
  }

  return (
    <AddOrEditPlanModal
      open={activeModal === Modals.AddPlan}
      onSubmit={onSubmit}
    />
  )
}

export default AddPlanModal
