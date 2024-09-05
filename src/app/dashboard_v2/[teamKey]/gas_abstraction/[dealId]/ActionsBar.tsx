"use client"

import { CheckIcon } from "@heroicons/react/20/solid"
import { Button } from "@/components/Button"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { DealUpdateContext } from "@/providers/DealUpdateProvider"
import { formatDateAndTime } from "@/utils/helpers"
import SubTitle from "@/components/v2/dashboard/SubTitle"

export const ActionsBar = () => {
  const { clearPendingUpdates, deal, hasPendingUpdates, isUpdating } =
    useRequiredContext(DealUpdateContext)

  return (
    <div className="inset-x-0 bottom-0 py-6 flex items-center justify-between">
      <SubTitle>Plan Configuration</SubTitle>

      <div className="flex items-center space-x-4">
        <Button variant="secondary">View API</Button>
        <Button
          disabled={!hasPendingUpdates || isUpdating}
          variant="secondary"
          onClick={clearPendingUpdates}
        >
          Reset
        </Button>
        <Button type="submit" disabled={!hasPendingUpdates} loading={isUpdating}>
          <CheckIcon className="w-5 h-5" />
          Save changes
        </Button>
      </div>
    </div>
  )
}
