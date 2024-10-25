"use client"

import { PencilSquareIcon } from "@heroicons/react/20/solid"
import { useMemo } from "react"
import { Button } from "@/components/Button"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { DealUpdateContext } from "@/providers/DealUpdateProvider"
import { formatDate } from "@/utils/helpers"
import { RuleSetting } from "./RuleSetting"

export const DealDurationSetting = () => {
  const { openModal } = useModals()
  const { deal } = useRequiredContext(DealUpdateContext)

  const onClick = () => {
    openModal(Modals.DealDuration)
  }

  const description = useMemo(() => {
    const { endTime, startTime } = deal ?? {}

    if (startTime && !endTime) {
      return `From ${formatDate(startTime)}`
    }

    if (endTime && !startTime) {
      return `Until ${formatDate(endTime)}`
    }

    if (startTime && endTime) {
      return `${formatDate(startTime)} - ${formatDate(endTime)}`
    }

    return "No limitations"
  }, [deal])

  return (
    <RuleSetting title="Plan duration" description={description}>
      <Button onClick={onClick} variant="border">
        <PencilSquareIcon className="w-4 h-4" />
      </Button>
    </RuleSetting>
  )
}
