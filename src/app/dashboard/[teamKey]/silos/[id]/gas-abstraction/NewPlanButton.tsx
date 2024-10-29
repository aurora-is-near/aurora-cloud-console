"use client"

import { PlusIcon } from "@heroicons/react/20/solid"
import { Button } from "@/components/Button"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"

type NewPlanButtonProps = {
  className?: string
  disabled?: boolean
}

export const NewPlanButton = ({ className, disabled }: NewPlanButtonProps) => {
  const { openModal } = useModals()

  const onNewPlanClick = async () => {
    openModal(Modals.AddPlan)
  }

  return (
    <Button disabled={disabled} className={className} onClick={onNewPlanClick}>
      <div className="flex w-full items-center gap-x-2">
        <PlusIcon className="w-6 h-6" />
        New plan
      </div>
    </Button>
  )
}
