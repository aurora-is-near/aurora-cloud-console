"use client"

import { PencilSquareIcon } from "@heroicons/react/20/solid"
import { useMemo } from "react"
import { Button } from "@/components/Button"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { formatDate } from "@/utils/helpers"
import { Deal } from "@/types/types"
import { RuleSetting } from "./RuleSetting"

export const DealDurationSetting = ({ deal }: { deal: Deal }) => {
  const { openModal } = useModals()

  const onClick = () => {
    openModal(Modals.DealDuration)
  }

  const description = useMemo(() => {
    const { end_time, start_time } = deal ?? {}

    if (start_time && !end_time) {
      return `From ${formatDate(start_time)}`
    }

    if (end_time && !start_time) {
      return `Until ${formatDate(end_time)}`
    }

    if (start_time && end_time) {
      return `${formatDate(start_time)} - ${formatDate(end_time)}`
    }

    return "No limit"
  }, [deal])

  return (
    <RuleSetting title="Plan duration" description={description}>
      <Button onClick={onClick} variant="border">
        <PencilSquareIcon className="w-4 h-4" />
      </Button>
    </RuleSetting>
  )
}
