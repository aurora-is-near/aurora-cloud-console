"use client"

import { usePathname, useRouter } from "next/navigation"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { Team } from "@/types/types"
import { createDeal } from "@/actions/deals/create-deal"
import { assertNonNullSupabaseResult } from "@/utils/supabase"
import { AddOrEditPlanModal } from "./AddOrEditPlanModal"

type AddPlanModalProps = {
  team: Team
}

const AddPlanModal = ({ team }: AddPlanModalProps) => {
  const { activeModal } = useModals()
  const router = useRouter()
  const pathname = usePathname()

  const onSubmit = async (data: { name: string }) => {
    const newDeal = await createDeal({
      team_id: team.id,
      ...data,
    })

    assertNonNullSupabaseResult(newDeal)

    // Append the deal ID to the current path to navigate to the new deal page.
    router.push(`${pathname}/${newDeal?.data?.id}`)
  }

  return (
    <AddOrEditPlanModal
      open={activeModal === Modals.AddPlan}
      onSubmit={onSubmit}
    />
  )
}

export default AddPlanModal
